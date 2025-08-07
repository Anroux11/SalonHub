# SalonHub

SalonHub is a full-stack web application for booking appointments at salons and managing bookings. It features a robust .NET backend and a modern Next.js frontend, supporting user registration, booking, and salon management.

---

## Project Structure

```
SalonHub/
├── Backend/
│   ├── src/
│   │   ├── SalonHub.Application/
│   │   ├── SalonHub.Core/
│   │   ├── SalonHub.EntityFrameworkCore/
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

- **User Management:** Clients can register and login. Admins can register users that are managers of their own salon, while salons can add their employees and services that they offer.
- **Bookings:** Clients can create and manage bookings. When Creating a booking they can choose a specific Salon and a specific employee that theu want to go to.
- **Role-Based Access:** Secure access for different user roles (Client, Salon, Employee/Technician, Admin).
- **Salon Management:** Salons can manage employees and offered services.
- **Responsive UI:** Built with Ant Design for a modern look and feel.

---

## Integrations
..
- **Google Gemini AI**
- **SupaBase S3 Bucket Storage** (Photo Storage)

---

## Technologies Used

- **Backend:** ASP.NET Core (v8), Entity Framework Core, ABP Framework, Neon PostgreSQL, Render, SupaBase
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

1. **Requirements:** [Node.js](https://nodejs.org/) (Node version >=18)
2. **Install dependencies:**
   ```sh
   cd Frontend
   npm install
   ```
3. **Run the frontend:**
   ```sh
   npm run dev
   ```
4. **Access the app:** Visit `http://localhost:3000` in your browser.

---

## Environment Variables

- Backend: See `Backend/.env`
- Frontend: See `Frontend/.env`

---

## FIgma WireFrames

https://www.figma.com/design/rNQDXWTQebZSymfBj9JI12/SalonHub?node-id=0-1&p=f&t=TCfspMZsU30mxop1-0

---

## Domain Model

![alt text](<SalonHub Domain.drawio-1.png>)

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For questions or support, please open an issue or contact the maintainer.