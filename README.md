# Ecommerce API 

API for an e-commerce store catering to customers and their orders.


1. Authenticate customers
2. Create orders
3. Get customer orders (maximum of 5 per page)
4. Filter and sort customer orders based on price.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT == 8081`

`JWT_SECRET_KEY`

## Run with Docker

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Create Docker Image 

Ensure you have the docker application and havs started it

You can use any name for you image I choose to use *ecommerce_api*

```bash
  docker build -t ecommerce_api .
```

Start the server

```bash
  docker run -p 8081:8081 ecommerce_api
```


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run serve
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

To run coverage tests, run the following command

```bash
  npm run coverage
```

## API Reference

#### Create Customer

```http
  POST /api/v1/customer
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Customer name |
| `email` | `string` | Customer Email |
| `password` | `string` | Customer Password |

#### Authenticate Customer

```http
  POST /api/v1/customer/auth
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | Customer Email |
| `password` | `string` | Customer Password |

#### Create Order
```http
  POST /api/v1/customer/:id/order
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `billing_address` | `string` | Address of Customer|
| `total_price` | `float` | Total Price |
| `no_of_products` | `number` | Number of product bought|
| `payment_method` | `string` | Customer Payment Method|

#### Get Customers Order
```http
  GET /api/v1/customer/:id/order
```

```
{
    "message": "Orders Retrieved",
    "status": 200,
    "data": {
        "order": [],
        "totalcount": 0,
        "totalpages": 0
    }
}
```



## Postman 

Here is the link to the postman 

[Click here ](https://lively-trinity-272442.postman.co/workspace/New-Team-Workspace~eedc351d-651b-41f9-bc15-38675c8dd2cb/collection/11403659-e3c5a54b-4d7c-41a9-8d61-b22af110b781?action=share&creator=11403659)

