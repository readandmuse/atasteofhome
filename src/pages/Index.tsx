import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen } from "lucide-react";
import { RecipeForm, Recipe } from "@/components/RecipeForm";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeView } from "@/components/RecipeView";
import sampleApplePie from "@/assets/sample-apple-pie.jpg";
import sampleIngredients from "@/assets/sample-ingredients.jpg";
import recipeBookBanner from "@/assets/recipe-book-banner.jpg";
import abcSoupPhoto1 from "@/assets/abc-soup-photo-1.jpg";
import abcSoupPhoto2 from "@/assets/abc-soup-photo-2.jpg";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Sample recipe data
const sampleRecipe: Recipe = {
  id: "sample-1",
  title: "奶奶的苹果派 (Grandma's Apple Pie)",
  description: "This is my grandmother's secret apple pie recipe, passed down through three generations. The secret is in the perfect balance of sweet and tart apples with just a hint of cinnamon.",
  ingredients: [
    "6-8 medium apples (mixed Granny Smith and Honeycrisp)",
    "2 cups all-purpose flour",
    "1 cup cold unsalted butter, cubed",
    "1/2 cup granulated sugar",
    "1/4 cup brown sugar",
    "2 tsp ground cinnamon",
    "1/4 tsp ground nutmeg",
    "1/4 tsp salt",
    "2 tbsp cornstarch",
    "1 egg for egg wash",
    "2 tbsp cold water"
  ],
  steps: [
    "Preheat your oven to 425°F (220°C). In a large bowl, mix flour and salt. Cut in cold butter until mixture resembles coarse crumbs.",
    "Gradually add cold water, mixing until dough forms. Divide in half, wrap in plastic, and refrigerate for at least 1 hour.",
    "Peel and slice apples into thin wedges. In a large bowl, toss apples with both sugars, cinnamon, nutmeg, and cornstarch.",
    "Roll out one dough portion on floured surface. Place in 9-inch pie pan. Fill with apple mixture.",
    "Roll out remaining dough for top crust. Place over filling and seal edges. Cut several slits for steam vents.",
    "Brush top with beaten egg. Bake for 45-50 minutes until crust is golden brown and filling is bubbly.",
    "Cool on wire rack for at least 2 hours before serving. Serve with vanilla ice cream if desired."
  ],
  cookingTime: "1 hour 30 minutes",
  servings: "8 slices",
  photos: [sampleApplePie, sampleIngredients],
  notes: "奶奶总是说，做苹果派最重要的是用心和耐心。The key to a perfect apple pie is patience and love. Don't rush the cooling process - it helps the filling set properly. This recipe works beautifully for both English and Chinese family gatherings!"
};

const stewedRiceRecipe: Recipe = {
  id: "sample-2",
  title: "Stewed Rice 煲仔饭 (Vegetable 芥菜/Potato/Sausage/Yam/Pumpkin)",
  description: "A hearty one-pot rice dish where all ingredients are fried in a pan first, then stewed together in a rice cooker. The mushroom and shrimp gravy gives the rice an incredible depth of flavour.",
  ingredients: [
    "Rice",
    "Onion",
    "Mushroom (冬菇 brown/black)",
    "Pork 烧肉",
    "Main vegetable (芥菜, potato, sausage, yam, or pumpkin)",
    "Shrimp 虾米",
    "Salt",
    "Dark soy sauce"
  ],
  steps: [
    "Soak the mushrooms (冬菇) for a few hours before cooking. Keep the mushroom water as it will form part of the gravy for the rice.",
    "Wash the rice first, then soak it for about 20-30 minutes before cooking.",
    "Fry the onion, mushroom, pork (烧肉), and shrimp (虾米) together in a pan. Add salt and dark soy sauce while frying.",
    "Add the main ingredient of your choice - vegetable (芥菜), pumpkin, yam, potato, or sausage.",
    "Pour in the shrimp gravy and mushroom gravy, just enough to fill up the rice. Don't pour all of it - too much water will turn the rice into congee!",
    "Transfer everything to the rice cooker. Leave it to stew and you're done!"
  ],
  cookingTime: "1 hour (plus mushroom soaking time)",
  servings: "4-6 servings",
  photos: [],
  notes: "Use a rice cooker. The key then is to fry all the ingredients in the pan before putting everything in the rice cooker to stew. Also, do not throw away the water that was for soaking the mushrooms - it's essential for the gravy!"
};

const abcSoupRecipe: Recipe = {
  id: "sample-3",
  title: "ABC Soup",
  description: "A nutritious and delicious soup loaded with vitamins! The name 'ABC' comes from the simple combination of essential vegetables. Perfect for the whole family with about 5-6 servings.",
  ingredients: [
    "Pork (排骨 fresh)",
    "Apples (optional)",
    "Potatoes (2 packets; each has around 6)",
    "Tomatoes (2 big ones) - you can add one more for a more sour and refreshed taste",
    "Onions (big portions: 2 big ones, small portions: 1 big one)",
    "Carrots (2)",
    "Salt (1 tsp)"
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
    "Boil for around 1.5 hours over small/mid fire."
  ],
  cookingTime: "1.5 hours",
  servings: "5-6 servings",
  photos: [abcSoupPhoto1, abcSoupPhoto2],
  notes: "The water really carries only main braising soup! Loads of nutrients and vitamins 😊"
};

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([sampleRecipe, stewedRiceRecipe, abcSoupRecipe]);
  const [currentView, setCurrentView] = useState<"list" | "form" | "view">("list");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>();
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | undefined>();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
      setRecipes(recipes.map(r => r.id === recipe.id ? recipe : r));
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
    return (
      <RecipeForm
        recipe={editingRecipe}
        onSave={handleSaveRecipe}
        onCancel={handleBack}
      />
    );
  }

  if (currentView === "view" && viewingRecipe) {
    return (
      <RecipeView
        recipe={viewingRecipe}
        onEdit={handleEditRecipe}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header with Banner */}
      <div className="relative border-b border-border overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${recipeBookBanner})` }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        <div className="relative max-w-5xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="font-display text-6xl font-semibold text-foreground mb-6 tracking-tight">
              A Taste of Home
            </h1>
            <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Also known as 家的味道 in Mandarin. From a daughter digitalising her mother's homemade recipes handwritten in 2011. New ones too.
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
              <h2 className="font-display text-4xl font-semibold text-foreground mb-4">
                Start Your Recipe Collection
              </h2>
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
              <h2 className="font-display text-5xl font-semibold text-foreground mb-4">
                Recipe Collection
              </h2>
              <p className="font-sans text-xl text-muted-foreground">
                {recipes.length} treasured recipe{recipes.length !== 1 ? 's' : ''} preserved
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onEdit={handleEditRecipe}
                  onView={handleViewRecipe}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
