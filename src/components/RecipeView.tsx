import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Edit, Image } from "lucide-react";
import { Recipe } from "./RecipeForm";

interface RecipeViewProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onBack: () => void;
}

export const RecipeView = ({ recipe, onEdit, onBack }: RecipeViewProps) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="font-handwritten border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipes
          </Button>
          <Button
            onClick={() => onEdit(recipe)}
            variant="outline"
            size="sm"
            className="font-handwritten border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Recipe
          </Button>
        </div>

        {/* Recipe Title Card */}
        <Card className="mb-6 bg-gradient-to-r from-card via-secondary/20 to-card border-2 border-border shadow-lg">
          <CardHeader className="text-center py-8">
            <CardTitle className="font-script text-5xl text-primary mb-4">
              {recipe.title}
            </CardTitle>
            {recipe.description && (
              <p className="font-handwritten text-xl text-muted-foreground max-w-2xl mx-auto italic">
                "{recipe.description}"
              </p>
            )}
            
            <div className="flex justify-center gap-4 mt-6">
              {recipe.cookingTime && (
                <Badge variant="secondary" className="font-handwritten text-base px-4 py-2 bg-secondary text-secondary-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  {recipe.cookingTime}
                </Badge>
              )}
              {recipe.servings && (
                <Badge variant="secondary" className="font-handwritten text-base px-4 py-2 bg-secondary text-secondary-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  {recipe.servings}
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Photos */}
        {recipe.photos && recipe.photos.length > 0 && (
          <Card className="mb-6 bg-card border-2 border-border">
            <CardHeader>
              <CardTitle className="font-script text-2xl text-primary flex items-center gap-2">
                <Image className="w-6 h-6" />
                Recipe Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipe.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`${recipe.title} - Photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border-2 border-border shadow-sm group-hover:shadow-md transition-shadow"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ingredients */}
          <Card className="bg-secondary/30 border-2 border-border h-fit">
            <CardHeader className="bg-secondary/50 border-b border-border">
              <CardTitle className="font-script text-3xl text-primary">
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 font-handwritten text-lg text-foreground"
                  >
                    <span className="font-script text-primary text-xl min-w-6">
                      •
                    </span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-accent/30 border-2 border-border">
            <CardHeader className="bg-accent/50 border-b border-border">
              <CardTitle className="font-script text-3xl text-primary">
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="font-script text-2xl text-primary min-w-8 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center border border-primary">
                      {index + 1}
                    </span>
                    <p className="font-handwritten text-lg text-foreground leading-relaxed pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Special Notes */}
        {recipe.notes && (
          <Card className="mt-6 bg-muted/30 border-2 border-border">
            <CardHeader>
              <CardTitle className="font-script text-2xl text-primary">
                Special Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-handwritten text-lg text-muted-foreground italic leading-relaxed">
                {recipe.notes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Journal-style footer */}
        <div className="mt-8 text-center">
          <p className="font-script text-lg text-muted-foreground">
            "Made with love, preserved with care"
          </p>
          <div className="w-32 h-0.5 bg-primary/30 mx-auto mt-2"></div>
        </div>
      </div>
    </div>
  );
};