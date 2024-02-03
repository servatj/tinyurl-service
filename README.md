# ShortURL Service

This service is a URL shortening API built with NestJS. It allows users to create shorter aliases for long URLs, making them easier to share and manage. Additionally, the service tracks usage statistics for each short URL.

## Features

- URL shortening: Convert long URLs into manageable short links.
- Stats tracking: Monitor how often each short URL is accessed.
- User management: Users can create accounts to manage their short URLs.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.2 or later)
- npm or Yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/tinyurl-service.git
   npm install
  ```

2 . Run the application


Running the Application
To start the application in development mode, run:

```
npm run start:dev
```

For production mode, first compile the project:

```
npm run build
```

```
npm run start:prod
```


## Usage

To create a short URL, make a POST request to /shorten with the original URL in the request body:

```
{
  "originalUrl": "https://www.example.com/very/long/url"
}
````

To view statistics for a short URL, make a GET request to /stats/{shortUrlId}.

## API Documentation
For full API documentation, visit /api on the running application to access the Swagger UI.

## Contributing
Contributions to the ShortURL service are welcome! Please read our CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
