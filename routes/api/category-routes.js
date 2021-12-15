const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
      try {
        const categoryData = await Category.findAll(
          {
          include: [
            { model: Product }
          ],
          });
      res.status(200).json(categoryData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    console.log(req.params.id)
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        { model: Product }
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
  const categoryData = await Category.findByPk(req.params.id)
  categoryData.category_name = req.body.category_name

  res.status(200).json(categoryData)

} catch (err) {
  console.log(err)
  res.status(500).json(err);
}
})


router.delete('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
