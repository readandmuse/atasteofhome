import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookingTime: string;
  servings: string;
  photos: string[];
  photoRotations?: number[]; // Rotation in degrees for each photo (0, 90, 180, 270)
  notes: string;
}

interface RecipeFormProps {
  recipe?: Recipe;
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
}

export const RecipeForm = ({ recipe, onSave, onCancel }: RecipeFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<Recipe>({
    defaultValues: recipe || {
      id: "",
      title: "",
      description: "",
      ingredients: [""],
      steps: [""],
      cookingTime: "",
      servings: "",
      photos: [],
      notes: "",
    },
  });

  const [ingredients, setIngredients] = useState<string[]>(recipe?.ingredients || [""]);
  const [steps, setSteps] = useState<string[]>(recipe?.steps || [""]);
  const [photos, setPhotos] = useState<string[]>(recipe?.photos || []);
  const { toast } = useToast();

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const onSubmit = (data: Recipe) => {
    const recipeData = {
      ...data,
      id: recipe?.id || Date.now().toString(),
      ingredients: ingredients.filter(ing => ing.trim() !== ""),
      steps: steps.filter(step => step.trim() !== ""),
      photos,
    };
    
    onSave(recipeData);
    toast({
      title: recipe ? "Recipe updated!" : "Recipe saved!",
      description: "Your mother's recipe has been saved to the collection.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-4xl mx-auto bg-card shadow-lg border-2 border-border">
        <CardHeader className="text-center border-b border-border bg-gradient-to-r from-secondary/30 to-muted/30">
          <CardTitle className="font-serif text-4xl text-primary mb-2">
            {recipe ? "Edit Recipe" : "New Recipe"}
          </CardTitle>
          <CardDescription className="font-sans text-lg text-muted-foreground">
            "Every recipe tells a story of love and tradition"
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-8 p-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label className="font-sans text-lg text-foreground">Recipe Title</Label>
                <Input
                  {...register("title", { required: true })}
                  className="font-sans text-lg mt-2 bg-background border-2 border-border focus:border-primary"
                  placeholder="Mom's famous apple pie..."
                />
              </div>

              <div>
                <Label className="font-sans text-lg text-foreground">Description</Label>
                <Textarea
                  {...register("description")}
                  className="font-sans text-base mt-2 bg-background border-2 border-border focus:border-primary min-h-20"
                  placeholder="A brief story about this recipe..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-sans text-lg text-foreground">Cooking Time</Label>
                  <Input
                    {...register("cookingTime")}
                    className="font-sans text-base mt-2 bg-background border-2 border-border focus:border-primary"
                    placeholder="45 minutes"
                  />
                </div>
                <div>
                  <Label className="font-sans text-lg text-foreground">Servings</Label>
                  <Input
                    {...register("servings")}
                    className="font-sans text-base mt-2 bg-background border-2 border-border focus:border-primary"
                    placeholder="4-6 people"
                  />
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-secondary/20 p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Label className="font-elegant text-2xl text-primary">Ingredients</Label>
                <Button
                  type="button"
                  onClick={addIngredient}
                  variant="outline"
                  size="sm"
                  className="font-sans border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="font-sans text-base bg-background border border-border focus:border-primary"
                      placeholder="1 cup flour, 2 eggs, etc..."
                    />
                    {ingredients.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="bg-accent/20 p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Label className="font-elegant text-2xl text-primary">Recipe Steps</Label>
                <Button
                  type="button"
                  onClick={addStep}
                  variant="outline"
                  size="sm"
                  className="font-sans border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Step
                </Button>
              </div>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="font-elegant text-xl text-primary mt-2 min-w-8">
                      {index + 1}.
                    </div>
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        value={step}
                        onChange={(e) => updateStep(index, e.target.value)}
                        className="font-sans text-base bg-background border border-border focus:border-primary min-h-16"
                        placeholder="Describe this step in detail..."
                      />
                      {steps.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeStep(index)}
                          variant="outline"
                          size="sm"
                          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-muted/20 p-6 rounded-lg border border-border">
              <Label className="font-elegant text-2xl text-primary mb-4 block">Photos</Label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById("photo-upload")?.click()}
                    variant="outline"
                    className="font-sans border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photos
                  </Button>
                </div>

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Recipe photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-border shadow-sm"
                        />
                        <Button
                          type="button"
                          onClick={() => removePhoto(index)}
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label className="font-elegant text-2xl text-primary mb-2 block">Special Notes</Label>
              <Textarea
                {...register("notes")}
                className="font-sans text-base bg-background border-2 border-border focus:border-primary min-h-24"
                placeholder="Any special tips, memories, or variations..."
              />
            </div>
          </CardContent>

          <CardFooter className="flex gap-4 justify-end p-8 bg-gradient-to-r from-secondary/20 to-muted/20 border-t border-border">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="font-sans text-base px-8 border-border text-foreground hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-sans text-base px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {recipe ? "Update Recipe" : "Save Recipe"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};