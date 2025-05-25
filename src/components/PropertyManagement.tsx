
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { deleteProperty } from "@/services/propertyService";
import { useAuth } from "@/contexts/AuthContext";

interface PropertyManagementProps {
  property?: Property;
  isDetail?: boolean;
}

const PropertyManagement = ({ property, isDetail = false }: PropertyManagementProps) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, profile, isAgent } = useAuth();
  
  // Check if the user is authenticated and has permission to manage properties
  const canManageProperties = user && isAgent();
  
  const handleAddNew = () => {
    navigate("/property/add");
  };
  
  const handleEdit = () => {
    if (property) {
      navigate(`/property/edit/${property.id}`);
    }
  };
  
  const handleDelete = async () => {
    if (!property) return;
    
    setIsDeleting(true);
    
    try {
      await deleteProperty(property.id);
      toast.success("Property deleted successfully");
      navigate("/properties");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete property");
    } finally {
      setIsDeleting(false);
    }
  };
  
  // If user is not authenticated or not an agent, don't render management buttons
  if (!canManageProperties) {
    return null;
  }
  
  return (
    <div className={`flex ${isDetail ? "justify-end" : "justify-between"} items-center`}>
      {!isDetail && (
        <Button onClick={handleAddNew} className="flex items-center gap-1">
          <Plus size={16} />
          Add Property
        </Button>
      )}
      
      {property && (
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-1"
          >
            <Edit size={16} />
            Edit
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                className="flex items-center gap-1"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the property
                  "{property.title}" and remove it from our database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
