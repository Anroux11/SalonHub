# SalonHub

SalonHub is a full-stack web application for reporting and managing pothole. It features a robust .NET backend and a modern Next.js frontend, supporting user registration, booking tracking, and salon management.

## Project Structure

```
SalonHub/
├── Backend/
│   ├── src/
│   │   ├── SalonHub.Application/
│   │   ├── SalonHub.Core/
│   │   ├── SalonHub.Web.Host/
│   │   └── ...
│   ├── test/
│   ├── build/
│   ├── docker/
│   └── SalonHub.sln
├── Frontend/
│   ├── src/
│   │   └── app/
│   ├── public/
│   ├── .next/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
└── README.md
```

---

## Features

- **User Management:** Clients can register and login. Admins can register users working for a specific salon while the salons can add service providers.
- **Bookings:** Clients can create booking. 
- **Role-Based Access:** Secure access for different user roles.
- **Responsive UI:** Built with Ant Design for a modern look and feel.

---
## Integrations
- Google(Gemini AI)
- SupaBase s3 Bucket Storage(Photo Storage)

---

## Technologies Used

- **Backend:** ASP.NET Core(v8), Entity Framework Core, ABP Framework, Neon PostgreSQL, Render
- **Frontend:** Next.js, React, Ant Design
- **Other:** Docker (optional), Swagger (API docs), log4net (logging)

---

## Getting Started

### Backend

1. **Requirements:** [.NET SDK](https://dotnet.microsoft.com/download)
2. **Install dependencies:**
   ```sh
   cd Backend
   dotnet restore
   ```
3. **Build the solution:**
   ```sh
   dotnet build SalonHub.sln
   ```
4. **Run the backend:**
   ```sh
   cd src/SalonHub.Web.Host
   dotnet run
   ```
5. **API Documentation:** Visit `/swagger` on your backend server for interactive API docs.

### Frontend

1. **Requirements:** [Node.js](https://nodejs.org/)
- Node version >=18

2. **Install dependencies:**
   ```sh
   cd Frontend
   npm install
   ```
3. **Run the frontend:**
   ```sh
   npm run dev
   ```
4. **Access the app:** Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a new Pull Request

---

## Design

https://www.figma.com/design/ODLD6WT6YKTRYkbcbpw7mE/SalonHub?node-id=0-1&p=f&t=HfRMtatKgqIONx4H-0

---

## Life Demo

salonHub.vercel.app
