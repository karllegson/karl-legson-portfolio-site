import React from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, altText }: ImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-dark-300/95 border-neutral-800">
        <DialogClose asChild>
          <button
            className="absolute -right-4 -top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-dark-200 border border-neutral-700 shadow-lg transition-all hover:scale-110 hover:bg-dark-100"
          >
            <span className="block w-4 h-0.5 bg-neutral-300 rotate-45 absolute"></span>
            <span className="block w-4 h-0.5 bg-neutral-300 -rotate-45 absolute"></span>
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={altText}
            className="w-auto h-auto max-w-[95%] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            style={{
              imageRendering: 'auto',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal; 