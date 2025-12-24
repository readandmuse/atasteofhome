import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen } from "lucide-react";
import { RecipeForm, Recipe } from "@/components/RecipeForm";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeView } from "@/components/RecipeView";
import recipeBookBanner from "@/assets/recipe-book-banner.jpg";
import heroCover from "@/assets/hero-cover.jpg";
import abcSoupPhoto1 from "@/assets/abc-soup-photo-1.jpg";
import abcSoupPhoto2 from "@/assets/abc-soup-photo-2.jpg";
import eggLongBeansPhoto1 from "@/assets/egg-long-beans-photo-1.jpg";
import eggLongBeansPhoto2 from "@/assets/egg-long-beans-photo-2.jpg";
import ladyFingersPhoto1 from "@/assets/lady-fingers-photo-1.jpg";
import ladyFingersPhoto2 from "@/assets/lady-fingers-photo-2.jpg";
import curryChickenPhoto1 from "@/assets/curry-chicken-photo-1.jpg";
import curryChickenPhoto2 from "@/assets/curry-chicken-photo-2.jpg";
import whiteRadishSoupPhoto1 from "@/assets/white-radish-soup-photo-1.jpg";
import whiteRadishSoupPhoto2 from "@/assets/white-radish-soup-photo-2.jpg";
import soyBeanPorkCapsicumPhoto1 from "@/assets/soy-bean-pork-capsicum-photo-1.jpg";
import soyBeanPorkCapsicumPhoto2 from "@/assets/soy-bean-pork-capsicum-photo-2.jpg";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const stewedRiceRecipe: Recipe = {
  id: "sample-2",
  title: "Stewed Rice 煲仔饭 (Vegetable 芥菜/Potato/Sausage/Yam/Pumpkin)",
  description:
    "A hearty one-pot rice dish where all ingredients are fried in a pan first, then stewed together in a rice cooker. The mushroom and shrimp gravy gives the rice an incredible depth of flavour.",
  ingredients: [
    "Rice",
    "Onion",
    "Mushroom (冬菇 brown/black)",
    "Pork 烧肉",
    "Main vegetable (芥菜, potato, sausage, yam, or pumpkin)",
    "Shrimp 虾米",
    "Salt",
    "Dark soy sauce",
  ],
  steps: [
    "Soak the mushrooms (冬菇) for a few hours before cooking. Keep the mushroom water as it will form part of the gravy for the rice.",
    "Wash the rice first, then soak it for about 20-30 minutes before cooking.",
    "Fry the onion, mushroom, pork (烧肉), and shrimp (虾米) together in a pan. Add salt and dark soy sauce while frying.",
    "Add the main ingredient of your choice - vegetable (芥菜), pumpkin, yam, potato, or sausage.",
    "Pour in the shrimp gravy and mushroom gravy, just enough to fill up the rice. Don't pour all of it - too much water will turn the rice into congee!",
    "Transfer everything to the rice cooker. Leave it to stew and you're done!",
  ],
  cookingTime: "1 hour (plus mushroom soaking time)",
  servings: "4-6 servings",
  photos: [],
  notes:
    "Use a rice cooker. The key then is to fry all the ingredients in the pan before putting everything in the rice cooker to stew. Also, do not throw away the water that was for soaking the mushrooms - it's essential for the gravy!",
};

const abcSoupRecipe: Recipe = {
  id: "sample-3",
  title: "ABC Soup",
  description:
    "A nutritious and delicious soup loaded with vitamins! The name 'ABC' comes from the simple combination of essential vegetables. Perfect for the whole family with about 5-6 servings.",
  ingredients: [
    "Pork (排骨 fresh)",
    "Apples (optional)",
    "Potatoes (2 packets; each has around 6)",
    "Tomatoes (2 big ones) - you can add one more for a more sour and refreshed taste",
    "Onions (big portions: 2 big ones, small portions: 1 big one)",
    "Carrots (2)",
    "Salt (1 tsp)",
  ],
  steps: [
    "Pour water into a big pot, around 3/4 of the pot filled up.",
    "Boil water in the pot. Bubbles are seen - hot water!",
    "(Optional) Scrap off the skin of apples that are left quite long and not eaten, and cut them into dice-like shapes.",
    "Add onions. Scrap off the skin, wash, then cut. Cut the big onion into half first before cutting it smaller.",
    "Then add tomatoes. Cut into half first, then into smaller shapes. Place slanted when cutting.",
    "Carrots added. Cut the carrots into thick strips first.",
    "Lastly, add potatoes (dice-like shapes). Then add 排骨 after washing.",
    "Add around 1 teaspoon of salt.",
    "Boil for around 1.5 hours over small/mid fire.",
  ],
  cookingTime: "1.5 hours",
  servings: "5-6 servings",
  photos: [abcSoupPhoto1, abcSoupPhoto2],
  photoRotations: [180, 0], // First photo needs 180 degree rotation
  notes: "Add leftover apples to give that extra sweetness to the soup!",
};

const eggLongBeansRecipe: Recipe = {
  id: "sample-4",
  title: "Egg and Long Beans 蛋炒四季豆",
  description: "A simple and delicious stir-fry dish where eggs and long beans come together beautifully.",
  ingredients: ["Eggs (4 to 5)", "Long beans 四季豆", "Salt", "Onion (bigger but diced)", "Light soy sauce"],
  steps: [
    "Add oil into the wok and put the diced (big) onions into the wok first. Fry it fast to prevent it from being burnt.",
    "Pour some salt onto the plate of cut beans. Beans should be cut like below (two at a time to be more efficient). Slanted and thin.",
    "Pour altogether in the wok till it has a nice smell.",
    "Add eggs, beaten with light soy sauce in a bowl, into the wok. The eggs must cover the beans. 'Move' your wok to let it cover beans. Beans must be spread out.",
    "Fry till it has a little burnt smell. Break the egg and flip it. Separate into pieces after it's fried.",
    "Dish is ready to be served!",
  ],
  cookingTime: "10-15 minutes",
  servings: "3-4 servings",
  photos: [eggLongBeansPhoto1, eggLongBeansPhoto2],
  photoRotations: [180, 0], // First photo needs 180 degree rotation
  notes:
    "The key is to fry the onions quickly to avoid burning, and make sure the eggs cover the beans completely before flipping!",
};

const ladyFingersRecipe: Recipe = {
  id: "sample-5",
  title: "Stir-Fry Lady Fingers/Okra 炒秋葵",
  description:
    "Easy to cook! A simple stir-fry dish with lady fingers (okra) in a savoury oyster sauce. Quick and delicious.",
  ingredients: [
    "Lady Fingers (Okra)",
    "Onions (diced)",
    "Garlic (diced)",
    "Oyster sauce (4 metal spoons)",
    "Salt (½ tsp)",
  ],
  steps: [
    "Dice onions and garlic.",
    "Put onions and garlic in the wok with oil and fry them.",
    "Put ½ tsp of salt.",
    "Stir-fry them till a nice smell is detected.",
    "Pour 4 metal spoons of oyster sauce.",
    "Pour in all the Lady's Fingers. Cut off the end first, then cut it slantedly into thin pieces.",
    "Fry them altogether till it's cooked.",
    "Dish is ready to be served!",
  ],
  cookingTime: "10-15 minutes",
  servings: "3-4 servings",
  photos: [ladyFingersPhoto1, ladyFingersPhoto2],
  notes: "CAUTION! DON'T ADD WATER! It will make the dish even more gluey!",
};

const curryChickenRecipe: Recipe = {
  id: "sample-6",
  title: "Curry Chicken 咖喱鸡",
  description: "Easy to cook, just follow the curry sauce packet! A delicious homestyle curry chicken with potatoes.",
  ingredients: ["Chicken wings", "Potatoes", "Chicken curry sauce (Brahim's brand)", "Chilli padi", "Onion", "Salt"],
  steps: [
    "Defrost the chicken wings and cut out the fats in the chicken wings first.",
    "Cut the wing into half.",
    "Using the pot which is suitable for 炖 stuffs (like the meat with capsicum on previous page), throw in the diced onion and fry it with oil.",
    "Add salt to the onions and fry it. Together with chilli padi.",
    "Then put in the chicken wings. Fry them altogether until you see that the meat is cooked. Keep stir-frying it.",
    "Then add in the chicken curry sauce, all into the pot. Fill up some water into the packet and pour into the pot, to be made as curry gravy. Keep frying it.",
    "Cover the pot and put it on small fire for about 10 minutes. Let it 炖 for a little while.",
    "Dish is ready to be served!",
  ],
  cookingTime: "30-40 minutes",
  servings: "4-5 servings",
  photos: [curryChickenPhoto1, curryChickenPhoto2],
  notes:
    "Easy to cook - just follow the curry sauce packet instructions! The key is to let it simmer (炖) for a little while to let the flavors combine.",
};

const whiteRadishSoupRecipe: Recipe = {
  id: "sample-7",
  title: "White Radish Soup 白萝卜汤",
  description:
    "A healthy and nourishing soup with white radish, cuttlefish, pork, and carrots. Perfect comfort food for the whole family!",
  ingredients: [
    "Cuttlefish (dry) - 1 piece",
    "Radish 白萝卜 (2 small ones)",
    "Pork 三层肉/排骨 - 1 packet",
    "Carrots (2 small ones)",
    "Salt (1 tsp)",
  ],
  steps: [
    "Boil water (about 3/4 of the big pot filled with water).",
    "Wash and cut the cuttlefish into squares.",
    "Pour it into the pot of boiling water.",
    "Scrap the skin of the radish away. Carrots too.",
    "Cut them into dice-like shapes.",
    "Pour it into the pot of water with cuttlefish.",
    "Cook it for around 2½ hours.",
    "Put meat (排骨 and 三层肉) into the soup.",
    "Boil for a few minutes.",
    "Soup is ready to be served!",
    "Wash the pork and put them on a metal plate.",
    "After the pot of water is boiled, pour some boiling water from the pot across the plate of pork. Using a ladle.",
    "Put the pork inside the pot.",
    "Adjust to mid-fire. Boil for around 20 minutes.",
    "Add 1 tsp of salt into the pot.",
    "After boiling at mid-fire, adjust to small fire.",
    "Boil for about 2 hours at small fire. Soup is ready!",
  ],
  cookingTime: "2.5-3 hours",
  servings: "5-6 servings",
  photos: [whiteRadishSoupPhoto1, whiteRadishSoupPhoto2],
  notes: "A healthy soup! 😊 Cut away the fats if the pork contains too much of fats.",
};

const soyBeanPorkCapsicumRecipe: Recipe = {
  id: "sample-8",
  title: "Soy Bean Paste Pork Rib with Capsicum 豆酱排骨炒彩椒",
  description:
    "The soy bean paste makes it really yummy! A delicious stir-fry dish with tender pork ribs and colourful capsicum in savoury soy bean paste sauce.",
  ingredients: [
    "Garlic (3-4 pieces, diced)",
    "Oil (4 table metal spoons)",
    "豆酱 Soy bean paste (4 metal tablespoons)",
    "排骨 Spare ribs (about 1kg)",
    "灯笼椒/柿子椒 Capsicum red/green (2)",
    "Chilli padi (1-2条/粒)",
  ],
  steps: [
    "Cut the red/green/yellow capsicum into smaller pieces, like how you cut carrots in the ABC soup.",
    "炒 all the capsicum with garlic and oil.",
    "Fry till the colours are bright.",
    "Dish out the capsicum and put on a plate.",
    "Prepare the 豆酱 (soy bean paste) 排骨 with water, there must be more water than the bean paste. Mix them all in a bowl.",
    "Fry the 排骨, all of them with garlic and the diced chilli. 炒 它 all.",
    "Pour the bean paste (mixed) into the wok. Let it 炒 for 5 min. Then pour the plate of capsicum all into the wok and it 炒 for 5 min again.",
    "After that, transfer the whole dish into the pot which is used for 炖 stuffs (like previous page) and 炒 it for about 10-15 min on mid-fire.",
    "Dish is ready to be served!",
  ],
  cookingTime: "30-40 minutes",
  servings: "4-5 servings",
  photos: [soyBeanPorkCapsicumPhoto1, soyBeanPorkCapsicumPhoto2],
  photoRotations: [180, 0],
  notes: "The soy bean paste makes it really yummy! Make sure to mix the paste with water before adding to the wok.",
};

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    abcSoupRecipe,
    eggLongBeansRecipe,
    ladyFingersRecipe,
    curryChickenRecipe,
    whiteRadishSoupRecipe,
    soyBeanPorkCapsicumRecipe,
  ]);
  const [currentView, setCurrentView] = useState<"list" | "form" | "view">("list");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>();
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | undefined>();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const canAdd = session?.user?.email === "jotan.work@gmail.com";

  const handleSaveRecipe = (recipe: Recipe) => {
    if (editingRecipe) {
      setRecipes(recipes.map((r) => (r.id === recipe.id ? recipe : r)));
    } else {
      setRecipes([...recipes, recipe]);
    }
    setCurrentView("list");
    setEditingRecipe(undefined);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setCurrentView("form");
    setViewingRecipe(undefined);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setViewingRecipe(recipe);
    setCurrentView("view");
  };

  const handleNewRecipe = () => {
    setEditingRecipe(undefined);
    setCurrentView("form");
  };

  const handleBack = () => {
    setCurrentView("list");
    setEditingRecipe(undefined);
    setViewingRecipe(undefined);
  };

  if (currentView === "form") {
    return <RecipeForm recipe={editingRecipe} onSave={handleSaveRecipe} onCancel={handleBack} />;
  }

  if (currentView === "view" && viewingRecipe) {
    return <RecipeView recipe={viewingRecipe} onEdit={handleEditRecipe} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header with Banner */}
      <div className="relative border-b border-border overflow-hidden">
        {/* Background Image with blur */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url(${heroCover})`,
            filter: "blur(3px)",
          }}
        />
        {/* Light warm color overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-orange-800/15 to-amber-700/20" />
        <div className="absolute inset-0 bg-background/40" />

        <div className="relative max-w-5xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="font-baskerville text-6xl font-bold text-foreground mb-6 tracking-tight">A Taste of Home</h1>
            <p className="font-sans text-lg text-foreground max-w-3xl mx-auto leading-relaxed italic">
              Also known as 家的味道 in Mandarin.
              <br />
              From a daughter who had handwritten her mother's homemade recipes
              <br />
              back in 2011 and is now digitising them. New ones upcoming!
            </p>
          </div>

          <div className="flex justify-center mt-12">
            {canAdd ? (
              <Button
                onClick={handleNewRecipe}
                size="lg"
                className="font-sans text-base px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <PlusCircle className="w-5 h-5 mr-3" />
                Add New Recipe
              </Button>
            ) : (
              <Button size="lg" variant="secondary" className="font-sans text-base px-8 py-4" asChild>
                <Link to="/auth">Sign in to add recipes</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        {recipes.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-8">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-display text-4xl font-semibold text-foreground mb-4">Start Your Recipe Collection</h2>
              <p className="font-sans text-lg text-muted-foreground mb-10 leading-relaxed">
                Begin documenting those special family recipes that make every meal memorable.
              </p>
              {canAdd ? (
                <Button
                  onClick={handleNewRecipe}
                  className="font-sans text-base px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <PlusCircle className="w-5 h-5 mr-3" />
                  Add Your First Recipe
                </Button>
              ) : (
                <Button variant="secondary" className="font-sans text-base px-8 py-4" asChild>
                  <Link to="/auth">Sign in to add recipes</Link>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-16">
              <h2 className="font-baskerville text-5xl font-bold text-foreground mb-4">Recipe Collection</h2>
              <p className="font-sans text-xl text-muted-foreground">
                {recipes.length} cherished recipe{recipes.length !== 1 ? "s" : ""} preserved
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onEdit={handleEditRecipe} onView={handleViewRecipe} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer with original banner */}
      <div className="relative border-t border-border overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${recipeBookBanner})` }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative max-w-5xl mx-auto px-6 py-12 text-center">
          <p className="font-elegant text-lg text-muted-foreground">Made with love, preserved with care.</p>
          <div className="w-32 h-0.5 bg-primary/30 mx-auto mt-4"></div>
          <p className="font-sans text-sm text-muted-foreground mt-4">
            Created by{" "}
            <a
              href="https://jotance.my.canva.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Joanne Tan
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
