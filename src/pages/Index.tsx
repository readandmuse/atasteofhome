import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen } from "lucide-react";
import { RecipeForm, Recipe } from "@/components/RecipeForm";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeView } from "@/components/RecipeView";
import sampleApplePie from "@/assets/sample-apple-pie.jpg";
import sampleIngredients from "@/assets/sample-ingredients.jpg";

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

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([sampleRecipe]);
  const [currentView, setCurrentView] = useState<"list" | "form" | "view">("list");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>();
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | undefined>();

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
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary/40 via-card to-muted/40 border-b-2 border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-6xl text-primary mb-4">
              Mother's Good Taste 妈妈的味道
            </h1>
            <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
              "From a daughter digitalising her mother's homemade recipes handwritten in 2011. New ones too."
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleNewRecipe}
              size="lg"
              className="font-sans text-lg px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add New Recipe
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {recipes.length === 0 ? (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto bg-card border-2 border-border shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-serif text-3xl text-primary">
                  Start Your Recipe Collection
                </CardTitle>
                <CardDescription className="font-sans text-lg text-muted-foreground">
                  Begin documenting those special family recipes that make every meal memorable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleNewRecipe}
                  className="w-full font-sans text-base bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Your First Recipe
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="font-serif text-4xl text-primary mb-2">
                Recipe Collection
              </h2>
              <p className="font-sans text-lg text-muted-foreground">
                {recipes.length} treasured recipe{recipes.length !== 1 ? 's' : ''} preserved
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Footer */}
      <div className="bg-gradient-to-r from-secondary/20 to-muted/20 border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="font-elegant text-2xl text-primary mb-2">
            "Cooking is love made visible"
          </p>
          <div className="w-32 h-0.5 bg-primary/30 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
