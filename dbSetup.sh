#!/bin/bash
sudo apt-get update
sudo apt-get install -y postgresql-client
EOF

ssh -i "$SSH_KEY" -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" << EOF
psql -h localhost -U postgres -d tinyurl -c " \
  CREATE TABLE IF NOT EXISTS URLStats (
    id SERIAL PRIMARY KEY,
    ShortenedURL VARCHAR(255) NOT NULL,
    OriginalURL VARCHAR(255) NOT NULL,
    IPAddress VARCHAR(255) NOT NULL,
    UserAgent VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ShortenedURL (ShortenedURL),
    INDEX idx_UserID (UserID)
  );
EOF

npm run seed
EOF
