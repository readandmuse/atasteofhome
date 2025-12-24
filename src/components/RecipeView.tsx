import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, Clock, Users, Edit, Image, X } from "lucide-react";
import { Recipe } from "./RecipeForm";

interface RecipeViewProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onBack: () => void;
}

export const RecipeView = ({ recipe, onEdit, onBack }: RecipeViewProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedPhotoRotation, setSelectedPhotoRotation] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [recipe.id]);

  const handlePhotoClick = (photo: string, rotation: number) => {
    setSelectedPhoto(photo);
    setSelectedPhotoRotation(rotation);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="font-sans border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipes
          </Button>
          <Button
            onClick={() => onEdit(recipe)}
            variant="outline"
            size="sm"
            className="font-sans border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Recipe
          </Button>
        </div>

        {/* Recipe Title Card */}
        <Card className="mb-6 bg-gradient-to-r from-card via-secondary/20 to-card border-2 border-border shadow-lg">
          <CardHeader className="text-center py-8">
            <CardTitle className="font-baskerville text-5xl text-primary mb-4">
              {recipe.title}
            </CardTitle>
            {recipe.description && (
              <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto italic">
                "{recipe.description}"
              </p>
            )}
            
            <div className="flex justify-center gap-4 mt-6">
              {recipe.cookingTime && (
                <Badge variant="secondary" className="font-sans text-base px-4 py-2 bg-secondary text-secondary-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  {recipe.cookingTime}
                </Badge>
              )}
              {recipe.servings && (
                <Badge variant="secondary" className="font-sans text-base px-4 py-2 bg-secondary text-secondary-foreground">
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
              <CardTitle className="font-elegant text-2xl text-primary flex items-center gap-2">
                <Image className="w-6 h-6" />
                Recipe Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipe.photos.map((photo, index) => {
                  const rotation = recipe.photoRotations?.[index] || 0;
                  return (
                    <div 
                      key={index} 
                      className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-border"
                      onClick={() => handlePhotoClick(photo, rotation)}
                    >
                      <img
                        src={photo}
                        alt={`${recipe.title} - Photo ${index + 1}`}
                        className="w-full h-48 object-cover shadow-sm group-hover:shadow-md group-hover:border-primary/50 transition-all"
                        style={{ transform: `rotate(${rotation}deg)` }}
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                        <span className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-primary/80 px-3 py-1 rounded-full text-sm font-sans">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Photo Lightbox Dialog */}
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
            <div className="relative">
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-4 h-4" />
              </Button>
              {selectedPhoto && (
                <img
                  src={selectedPhoto}
                  alt="Recipe photo enlarged"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                  style={{ transform: `rotate(${selectedPhotoRotation}deg)` }}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ingredients */}
          <Card className="bg-secondary/30 border-2 border-border h-fit">
            <CardHeader className="bg-secondary/50 border-b border-border">
              <CardTitle className="font-elegant text-3xl text-primary">
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 font-sans text-lg text-foreground"
                  >
                    <span className="font-elegant text-primary text-xl min-w-6">
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
              <CardTitle className="font-elegant text-3xl text-primary">
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="font-elegant text-2xl text-primary min-w-8 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center border border-primary">
                      {index + 1}
                    </span>
                    <p className="font-sans text-lg text-foreground leading-relaxed pt-1">
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
              <CardTitle className="font-elegant text-2xl text-primary">
                Special Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-sans text-lg text-muted-foreground italic leading-relaxed">
                {recipe.notes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Journal-style footer */}
        <div className="mt-8 text-center">
          <p className="font-elegant text-lg text-muted-foreground">
            "Made with love, preserved with care"
          </p>
          <div className="w-32 h-0.5 bg-primary/30 mx-auto mt-2"></div>
        </div>
      </div>
    </div>
  );
};