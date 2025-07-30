# Store Management Frontend

A modern Angular frontend application for managing stores, stock inventory, and products with a clean yellow, white, and blue color scheme.

## 🚀 Features

- **Dashboard**: Overview of stores, stock levels, and key metrics
- **Store Management**: Create, edit, delete, and view store details
- **Stock Management**: Manage inventory across all stores
- **Product Catalog**: Browse and search available products
- **Stock Consumption**: Track stock usage with transaction history
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🎨 Design

The application features a professional design with:
- **Primary Colors**: Blue (#1e40af), Yellow (#fbbf24), White (#ffffff)
- **Modern UI**: Clean cards, smooth animations, and intuitive navigation
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: Proper contrast ratios and semantic HTML

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (will be installed automatically)

## 🛠️ Installation & Setup

1. **Extract the project files** to your desired directory

2. **Navigate to the project directory**:
   ```bash
   cd store-frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:4200
   ```

## 🔧 Configuration

### Backend API Configuration

The frontend is configured to connect to your Spring Boot backend at `http://localhost:8080`. 

If your backend runs on a different port or URL, update the API endpoints in these service files:
- `src/app/services/store.service.ts`
- `src/app/services/stock.service.ts`
- `src/app/services/product.service.ts`

Example:
```typescript
private apiUrl = 'http://your-backend-url:port/stores';
```

## 📱 Application Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Main dashboard
│   │   ├── store/              # Store management
│   │   ├── stock/              # Stock management
│   │   └── product/            # Product catalog
│   ├── models/                 # TypeScript interfaces
│   ├── services/               # API services
│   └── app-routing.module.ts   # Route configuration
├── styles.css                  # Global styles
└── assets/                     # Static assets
```

## 🧭 Navigation

The application includes the following main sections:

1. **Dashboard** (`/dashboard`) - Overview and statistics
2. **Stores** (`/stores`) - Store management
3. **Stocks** (`/stocks`) - Inventory management
4. **Products** (`/products`) - Product catalog

## 🔄 API Integration

The frontend integrates with your Spring Boot backend through these endpoints:

### Store Endpoints
- `GET /stores` - Get all stores
- `POST /stores` - Create new store
- `PUT /stores/{id}` - Update store
- `DELETE /stores/{id}` - Delete store
- `GET /stores/{id}/stocks` - Get store stocks

### Stock Endpoints
- `GET /stocks` - Get all stocks
- `POST /stocks/store/{storeId}` - Create stock
- `PUT /stocks/{id}` - Update stock
- `DELETE /stocks/{id}` - Delete stock
- `POST /stocks/consume` - Consume stock
- `GET /stocks/{id}/transactions` - Get transactions

### Product Endpoints
- `GET /stocks/products` - Get all products
- `GET /stocks/products/{sku}/availability` - Check availability

## 🎯 Key Features Explained

### Dashboard
- Real-time statistics display
- Low stock alerts
- Recent activity tracking
- Quick action buttons

### Store Management
- Create and edit stores with validation
- View store details with stock information
- Delete individual or all stores
- Responsive card-based layout

### Stock Management
- Add stock items to specific stores
- Update stock quantities
- Consume stock with transaction logging
- Visual status indicators (In Stock, Low Stock, Out of Stock)

### Product Catalog
- Browse all available products
- Search and filter functionality
- Check product availability
- Detailed product information display

### Stock Consumption
- Select quantity to consume
- Real-time preview of remaining stock
- Transaction history tracking
- Validation to prevent over-consumption

## 🎨 Customization

### Colors
The color scheme is defined in `src/styles.css` using CSS variables:
```css
:root {
  --primary-blue: #1e40af;
  --light-blue: #3b82f6;
  --dark-blue: #1e3a8a;
  --primary-yellow: #fbbf24;
  --light-yellow: #fde047;
  --dark-yellow: #f59e0b;
  --white: #ffffff;
}
```

### Styling
- Global styles are in `src/styles.css`
- Component-specific styles are in each component's `.css` file
- Responsive breakpoints are handled with CSS media queries

## 🚀 Building for Production

To build the application for production:

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Spring Boot backend has CORS configured properly
2. **API Connection**: Verify the backend is running on the expected port
3. **Build Errors**: Clear node_modules and reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Development Tips

- Use browser developer tools to inspect API calls
- Check the browser console for error messages
- Verify backend endpoints are responding correctly
- Test responsive design using browser device simulation

## 📞 Support

If you encounter any issues:

1. Check that your Spring Boot backend is running
2. Verify all dependencies are installed correctly
3. Ensure the API endpoints match your backend configuration
4. Check browser console for error messages

## 🔄 Updates

To update the application:
1. Pull the latest changes
2. Run `npm install` to update dependencies
3. Restart the development server

---

**Happy coding! 🎉**

The application is designed to be intuitive and user-friendly. The clean interface and responsive design ensure a great experience across all devices.