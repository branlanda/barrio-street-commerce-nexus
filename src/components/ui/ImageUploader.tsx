
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageUploaderProps {
  currentImageUrl?: string;
  onFileChange: (file: File | null) => void;
  className?: string;
  height?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'banner';
  label?: string;
  isLoading?: boolean;
  placeholder?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onFileChange,
  className = '',
  height = 'h-40',
  aspectRatio = 'square',
  label = 'Imagen',
  isLoading = false,
  placeholder = 'Seleccionar una imagen',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    banner: 'aspect-[16/5]',
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileChange(file);
      
      // Create local preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onFileChange(null);
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Label htmlFor={`uploader-${label}`} className="block mb-2">
          {label}
        </Label>
      )}
      
      <div className={`${height} bg-gray-100 rounded-md overflow-hidden mb-2 relative`}>
        {isLoading ? (
          <Skeleton className={`w-full h-full ${aspectRatioClasses[aspectRatio]}`} />
        ) : previewUrl || currentImageUrl ? (
          <>
            <img 
              src={previewUrl || currentImageUrl}
              alt="Image preview" 
              className={`w-full h-full object-cover ${aspectRatioClasses[aspectRatio]}`}
            />
            <Button 
              type="button"
              variant="destructive" 
              size="sm"
              className="absolute top-2 right-2 rounded-full p-1 h-8 w-8"
              onClick={handleRemoveImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>Vista previa</span>
          </div>
        )}
      </div>
      
      <Label htmlFor={`uploader-${label}`} className="cursor-pointer">
        <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md py-3 hover:bg-gray-50 transition-colors">
          <Upload className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-sm text-gray-600">{placeholder}</span>
        </div>
        <input 
          id={`uploader-${label}`}
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </Label>
      <p className="text-xs text-gray-500 mt-1">
        JPG, PNG o GIF. Tamaño máximo 2MB.
      </p>
    </div>
  );
};

export { ImageUploader };
