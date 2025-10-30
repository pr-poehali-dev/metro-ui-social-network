-- Create users table with authentication and roles
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    avatar VARCHAR(10),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'creator')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert the creator user with hashed password
-- Password: aboba333 (storing as plain text hash for demo, in production use bcrypt)
INSERT INTO users (username, password_hash, email, avatar, role) 
VALUES ('qdvhxfs', 'aboba333', 'qdvhxfs@example.com', 'QD', 'creator');

-- Create index on username for faster lookups
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
