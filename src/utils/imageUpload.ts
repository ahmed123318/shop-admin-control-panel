
import { useToast } from "@/hooks/use-toast";

export const useImageUpload = () => {
  const { toast } = useToast();

  const uploadImage = async (file: File): Promise<string> => {
    // In a real application, this would upload to a storage service
    // For now, we'll simulate it and return a data URL
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          // Simulate network delay
          setTimeout(() => {
            resolve(e.target.result as string);
          }, 500);
        }
      };
      
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
        reject(new Error("Failed to read file"));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    try {
      const uploads = await Promise.all(files.map(file => uploadImage(file)));
      return uploads;
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload one or more images",
        variant: "destructive",
      });
      return [];
    }
  };

  return {
    uploadImage,
    uploadMultipleImages
  };
};
