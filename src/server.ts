import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const app= express()
app.use(cors())
app.use(express.json())
const prisma= new PrismaClient()

const port= 4000
//products
app.get('/products', async (req, res) => {
   try{ const products = await prisma.product.findMany({include: {basket: true, categories:true}})
    res.send(products)
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
  })
  
  
  app.get(`/products/:id`, async (req, res) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(req.params.id) },
        include: { categories: true ,basket:true},
      });
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ error: "product not found" });
      }
    } catch (error) {
      //@ts-ignored
      res.status(400).send({ error: error.message });
    }
  });
  //users
  app.get('/users', async (req, res) => {
   try{ const users = await prisma.user.findMany({include:{basket:true}})
    res.send(users)
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
  })


  // app.get(`/users/:id`, async (req, res) => {
  //   try {
  //     const users = await prisma.user.findUnique({
  //       where: { id: req.params.id },
  //     });
  //     if (users) {
  //       res.send(users);
  //     } else {
  //       res.status(404).send({ error: "user not found" });
  //     }
  //   } catch (error) {
  //     //@ts-ignored
  //     res.status(400).send({ error: error.message });
  //   }
  // });


  app.get(`/users/:id`, async (req, res) => {
    try {
      const users = await prisma.user.findUnique({
        where: { id: req.params.id }, include:{basket:true}
      });
      if (users) {
        res.send(users);
      } else {
        res.status(404).send({ error: "user not found" });
      }
    } catch (error) {
      //@ts-ignored
      res.status(400).send({ error: error.message });
    }
  });
  //basket
  app.get('/basket', async (req, res) => {
    try{ const baskets = await prisma.basket.findMany({include: {products: true, users:true}})
    res.send(baskets)
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
  })
  app.get(`/basket/:id`, async (req, res) => {
    try {
      const product = await prisma.basket.findUnique({
        where: { id: Number(req.params.id) },
        include: { products: true, users:true},
      });
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ error: "product not found" });
      }
    } catch (error) {
      //@ts-ignored
      res.status(400).send({ error: error.message });
    }
  });


  app.post('/basket', async (req, res) => {
    try {
      const basket = await prisma.basket.create({ data: req.body })
      res.send(basket)
    } catch (error) {
      // @ts-ignore
      res.status(400).send({ error: error.message })
    }
  })

  app.patch('/basket/:id', async (req, res) => {
    const id = Number(req.params.id)
    const basket = await prisma.basket.update({
      where: { id },
      data: req.body,
    })
    res.send(basket)
  })
  
  //categories
  app.get('/categories', async (req, res) => {
   try{ const categories = await prisma.categories.findMany()
    res.send(categories)
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
  })

  app.get(`/categories/:id`, async (req, res) => {
    try {
      const product = await prisma.categories.findUnique({
        where: { id: Number(req.params.id) },
        include: {products:true},
      });
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ error: "product not found" });
      }
    } catch (error) {
      //@ts-ignored
      res.status(400).send({ error: error.message });
    }
  });


  app.listen(port, () => {
    console.log(`App running: http://localhost:${port}`)
  })