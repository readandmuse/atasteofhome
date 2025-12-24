import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Edit2, Eye } from "lucide-react";
import { Recipe } from "./RecipeForm";

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onView: (recipe: Recipe) => void;
  canEdit?: boolean;
}

export const RecipeCard = ({ recipe, onEdit, onView, canEdit = false }: RecipeCardProps) => {
  const mainPhoto = recipe.photos?.[0];
  const mainPhotoRotation = recipe.photoRotations?.[0] || 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 bg-card border-2 border-border hover:border-primary/30 hover:-translate-y-1">
      {mainPhoto && (
        <div 
          className="relative overflow-hidden rounded-t-lg cursor-pointer"
          onClick={() => onView(recipe)}
        >
          <img
            src={mainPhoto}
            alt={recipe.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ transform: `rotate(${mainPhotoRotation}deg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <CardTitle className="font-baskerville text-2xl text-primary line-clamp-2 hover:text-primary/80 transition-colors">
          {recipe.title}
        </CardTitle>
        {recipe.description && (
          <CardDescription className="font-sans text-base text-muted-foreground line-clamp-2">
            {recipe.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.cookingTime && (
            <Badge variant="secondary" className="font-sans text-sm bg-secondary/80 text-secondary-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {recipe.cookingTime}
            </Badge>
          )}
          {recipe.servings && (
            <Badge variant="secondary" className="font-sans text-sm bg-secondary/80 text-secondary-foreground">
              <Users className="w-3 h-3 mr-1" />
              {recipe.servings}
            </Badge>
          )}
        </div>

        {recipe.ingredients.length > 0 && (
          <div className="mb-3">
            <h4 className="font-elegant text-lg text-primary mb-2">Key Ingredients:</h4>
            <p className="font-sans text-sm text-muted-foreground line-clamp-2">
              {recipe.ingredients.slice(0, 3).join(", ")}
              {recipe.ingredients.length > 3 && "..."}
            </p>
          </div>
        )}

        {recipe.steps.length > 0 && (
          <div>
            <h4 className="font-elegant text-lg text-primary mb-2">Recipe Preview:</h4>
            <p className="font-sans text-sm text-muted-foreground line-clamp-3">
              {recipe.steps[0]}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-border bg-gradient-to-r from-secondary/10 to-muted/10">
        <div className="flex gap-2 w-full">
          <Button
            onClick={() => onView(recipe)}
            variant="outline"
            className="flex-1 font-sans border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Recipe
          </Button>
          {canEdit && (
            <Button
              onClick={() => onEdit(recipe)}
              variant="outline"
              size="sm"
              className="font-sans border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};