| Column Name | Type | Required | Description | 
| --- | --- | --- | --- | 
| `user_id` | BIGINT / UUID | Yes | Unique identifier for each user. Primary key. | 
| `username` | VARCHAR(100) | Yes | Login name or system identifier. Must be unique. | 
| `display_name` | VARCHAR(200) | No | Name shown in UI. | 
| `email` | VARCHAR(255) | Yes | User email address. Must be unique. | 
| `phone_number` | VARCHAR(50) | No | Optional contact number. | 
---
