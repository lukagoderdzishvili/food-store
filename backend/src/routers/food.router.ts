import { Router } from 'express';
import { sample_foods, sample_tags } from '../data';
import asynceHandler from 'express-async-handler';
import { foodModel } from '../models/food.model';

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const foodsCount = await foodModel.countDocuments();
        if(foodsCount > 0){
            res.send("Seed is already done!");
            return
        }
        await foodModel.create(sample_foods);
        res.send("Seed Is Done!");
    }
));

router.get("/", asynceHandler(
    async (req, res) => {
        const foods = await foodModel.find();
        res.send(foods);
    }
));

router.get("/search/:searchTerm", asynceHandler(
    async(req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await foodModel.find({name: {$regex:searchRegex}});
        res.send(foods);
    }
));

router.get("/tags", asynceHandler(
    async(req, res) => {
        const tags = await foodModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group:{
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name: 'All',
            count: await foodModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
));

router.get("/tag/:tagName", asynceHandler(
    async (req, res) => {
        const foods = await foodModel.find({tags: req.params.tagName});
        res.send(foods);
    }
));


router.get("/:foodId", asynceHandler(
    async (req, res) => {
        const food = await foodModel.findById(req.params.foodId);
          res.send(food);
      }
));

export default router;