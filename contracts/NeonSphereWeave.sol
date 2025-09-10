// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract NeonSphereWeave is SepoliaConfig {
    using FHE for *;
    
    struct SocialConnection {
        euint32 connectionId;
        euint32 trustLevel;
        euint32 interactionCount;
        bool isActive;
        bool isVerified;
        address user1;
        address user2;
        uint256 createdAt;
        uint256 lastInteraction;
    }
    
    struct UserProfile {
        euint32 userId;
        euint32 reputationScore;
        euint32 connectionCount;
        bool isActive;
        bool isVerified;
        string username;
        string bio;
        address wallet;
        uint256 createdAt;
        uint256 lastSeen;
    }
    
    struct SocialInteraction {
        euint32 interactionId;
        euint32 connectionId;
        euint32 interactionType; // 1: message, 2: like, 3: share, 4: comment
        euint32 sentimentScore; // -100 to 100
        bool isEncrypted;
        string contentHash;
        address sender;
        uint256 timestamp;
    }
    
    struct PrivacySettings {
        euint32 visibilityLevel; // 1: public, 2: friends, 3: private
        euint32 dataRetentionDays;
        bool allowDataSharing;
        bool enableAnalytics;
        address user;
    }
    
    mapping(uint256 => SocialConnection) public connections;
    mapping(uint256 => UserProfile) public userProfiles;
    mapping(uint256 => SocialInteraction) public interactions;
    mapping(address => PrivacySettings) public privacySettings;
    mapping(address => euint32) public userReputation;
    mapping(address => mapping(address => bool)) public connectionExists;
    
    uint256 public connectionCounter;
    uint256 public userCounter;
    uint256 public interactionCounter;
    
    address public owner;
    address public verifier;
    
    event UserRegistered(uint256 indexed userId, address indexed wallet, string username);
    event ConnectionCreated(uint256 indexed connectionId, address indexed user1, address indexed user2);
    event InteractionCreated(uint256 indexed interactionId, uint256 indexed connectionId, address indexed sender);
    event PrivacySettingsUpdated(address indexed user, uint32 visibilityLevel);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event ConnectionVerified(uint256 indexed connectionId, bool isVerified);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function registerUser(
        string memory _username,
        string memory _bio,
        externalEuint32 initialReputation,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(userProfiles[userCounter].wallet == address(0), "User already exists");
        
        uint256 userId = userCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalReputation = FHE.fromExternal(initialReputation, inputProof);
        
        userProfiles[userId] = UserProfile({
            userId: FHE.asEuint32(0), // Will be set properly later
            reputationScore: internalReputation,
            connectionCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            username: _username,
            bio: _bio,
            wallet: msg.sender,
            createdAt: block.timestamp,
            lastSeen: block.timestamp
        });
        
        // Initialize privacy settings
        privacySettings[msg.sender] = PrivacySettings({
            visibilityLevel: FHE.asEuint32(2), // Default to friends only
            dataRetentionDays: FHE.asEuint32(365), // 1 year default
            allowDataSharing: false,
            enableAnalytics: false,
            user: msg.sender
        });
        
        emit UserRegistered(userId, msg.sender, _username);
        return userId;
    }
    
    function createConnection(
        address _user2,
        externalEuint32 trustLevel,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(_user2 != msg.sender, "Cannot connect to yourself");
        require(_user2 != address(0), "Invalid user address");
        require(!connectionExists[msg.sender][_user2], "Connection already exists");
        
        uint256 connectionId = connectionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalTrustLevel = FHE.fromExternal(trustLevel, inputProof);
        
        connections[connectionId] = SocialConnection({
            connectionId: FHE.asEuint32(0), // Will be set properly later
            trustLevel: internalTrustLevel,
            interactionCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            user1: msg.sender,
            user2: _user2,
            createdAt: block.timestamp,
            lastInteraction: block.timestamp
        });
        
        // Mark connection as existing in both directions
        connectionExists[msg.sender][_user2] = true;
        connectionExists[_user2][msg.sender] = true;
        
        emit ConnectionCreated(connectionId, msg.sender, _user2);
        return connectionId;
    }
    
    function createInteraction(
        uint256 connectionId,
        externalEuint32 interactionType,
        externalEuint32 sentimentScore,
        string memory contentHash,
        bytes calldata typeProof,
        bytes calldata sentimentProof
    ) public returns (uint256) {
        require(connections[connectionId].user1 != address(0), "Connection does not exist");
        require(
            connections[connectionId].user1 == msg.sender || 
            connections[connectionId].user2 == msg.sender, 
            "Not authorized to interact with this connection"
        );
        require(connections[connectionId].isActive, "Connection is not active");
        
        uint256 interactionId = interactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalType = FHE.fromExternal(interactionType, typeProof);
        euint32 internalSentiment = FHE.fromExternal(sentimentScore, sentimentProof);
        
        interactions[interactionId] = SocialInteraction({
            interactionId: FHE.asEuint32(0), // Will be set properly later
            connectionId: FHE.asEuint32(connectionId),
            interactionType: internalType,
            sentimentScore: internalSentiment,
            isEncrypted: true,
            contentHash: contentHash,
            sender: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update connection interaction count
        connections[connectionId].interactionCount = FHE.add(
            connections[connectionId].interactionCount, 
            FHE.asEuint32(1)
        );
        connections[connectionId].lastInteraction = block.timestamp;
        
        emit InteractionCreated(interactionId, connectionId, msg.sender);
        return interactionId;
    }
    
    function updatePrivacySettings(
        externalEuint32 visibilityLevel,
        externalEuint32 dataRetentionDays,
        bool allowDataSharing,
        bool enableAnalytics,
        bytes calldata visibilityProof,
        bytes calldata retentionProof
    ) public {
        require(privacySettings[msg.sender].user != address(0), "User not registered");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVisibility = FHE.fromExternal(visibilityLevel, visibilityProof);
        euint32 internalRetention = FHE.fromExternal(dataRetentionDays, retentionProof);
        
        privacySettings[msg.sender] = PrivacySettings({
            visibilityLevel: internalVisibility,
            dataRetentionDays: internalRetention,
            allowDataSharing: allowDataSharing,
            enableAnalytics: enableAnalytics,
            user: msg.sender
        });
        
        emit PrivacySettingsUpdated(msg.sender, 0); // FHE.decrypt(internalVisibility) - will be decrypted off-chain
    }
    
    function verifyConnection(uint256 connectionId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify connections");
        require(connections[connectionId].user1 != address(0), "Connection does not exist");
        
        connections[connectionId].isVerified = isVerified;
        emit ConnectionVerified(connectionId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getUserProfile(uint256 userId) public view returns (
        string memory username,
        string memory bio,
        uint8 reputationScore,
        uint8 connectionCount,
        bool isActive,
        bool isVerified,
        address wallet,
        uint256 createdAt,
        uint256 lastSeen
    ) {
        UserProfile storage profile = userProfiles[userId];
        return (
            profile.username,
            profile.bio,
            0, // FHE.decrypt(profile.reputationScore) - will be decrypted off-chain
            0, // FHE.decrypt(profile.connectionCount) - will be decrypted off-chain
            profile.isActive,
            profile.isVerified,
            profile.wallet,
            profile.createdAt,
            profile.lastSeen
        );
    }
    
    function getConnectionInfo(uint256 connectionId) public view returns (
        uint8 trustLevel,
        uint8 interactionCount,
        bool isActive,
        bool isVerified,
        address user1,
        address user2,
        uint256 createdAt,
        uint256 lastInteraction
    ) {
        SocialConnection storage connection = connections[connectionId];
        return (
            0, // FHE.decrypt(connection.trustLevel) - will be decrypted off-chain
            0, // FHE.decrypt(connection.interactionCount) - will be decrypted off-chain
            connection.isActive,
            connection.isVerified,
            connection.user1,
            connection.user2,
            connection.createdAt,
            connection.lastInteraction
        );
    }
    
    function getInteractionInfo(uint256 interactionId) public view returns (
        uint8 interactionType,
        uint8 sentimentScore,
        bool isEncrypted,
        string memory contentHash,
        address sender,
        uint256 timestamp
    ) {
        SocialInteraction storage interaction = interactions[interactionId];
        return (
            0, // FHE.decrypt(interaction.interactionType) - will be decrypted off-chain
            0, // FHE.decrypt(interaction.sentimentScore) - will be decrypted off-chain
            interaction.isEncrypted,
            interaction.contentHash,
            interaction.sender,
            interaction.timestamp
        );
    }
    
    function getPrivacySettings(address user) public view returns (
        uint8 visibilityLevel,
        uint8 dataRetentionDays,
        bool allowDataSharing,
        bool enableAnalytics
    ) {
        PrivacySettings storage settings = privacySettings[user];
        return (
            0, // FHE.decrypt(settings.visibilityLevel) - will be decrypted off-chain
            0, // FHE.decrypt(settings.dataRetentionDays) - will be decrypted off-chain
            settings.allowDataSharing,
            settings.enableAnalytics
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function deactivateConnection(uint256 connectionId) public {
        require(
            connections[connectionId].user1 == msg.sender || 
            connections[connectionId].user2 == msg.sender, 
            "Not authorized to deactivate this connection"
        );
        require(connections[connectionId].user1 != address(0), "Connection does not exist");
        
        connections[connectionId].isActive = false;
        
        // Remove from connection exists mapping
        connectionExists[connections[connectionId].user1][connections[connectionId].user2] = false;
        connectionExists[connections[connectionId].user2][connections[connectionId].user1] = false;
    }
    
    function updateLastSeen() public {
        // Find user profile by wallet address
        for (uint256 i = 0; i < userCounter; i++) {
            if (userProfiles[i].wallet == msg.sender) {
                userProfiles[i].lastSeen = block.timestamp;
                break;
            }
        }
    }
}
