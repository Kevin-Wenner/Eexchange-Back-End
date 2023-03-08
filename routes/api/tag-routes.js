const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
        // Category,
        {
          model: Product,
          through: ProductTag
        },
    ],
  }).then((response) => res.json(resonse))
  .catch((err) => res.status(400).json(err))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
      Where: {
        id: req.params.id
      },
      include: [
        Category,{
          model:Product,
          through: ProductTag
        }
      ],
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(err))
});

router.post('/', (req, res) => {
  // create a new tag
  
  Tag.create({})
    .then((response) => res.json(response)) 
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Category.update(req.body, {
    Where: {
      id: req.params.id
    }
  }).then(response => res.ok.json(response))
    .catch(err => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.update(req.body, {
    Where: {
      id: req.params.id
    }
  }).then(response => res.ok.json(response))
    .catch(err => res.status(400).json(err))
});

module.exports = router;
