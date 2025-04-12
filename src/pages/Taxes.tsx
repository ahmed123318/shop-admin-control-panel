
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";

type TaxStatus = "active" | "inactive";

interface Tax {
  id: number;
  name: string;
  rate: number;
  country: string;
  region: string;
  productCategories: string[];
  status: TaxStatus;
}

interface TaxFormValues {
  name: string;
  rate: number;
  country: string;
  region: string;
  productCategories: string[];
  status: TaxStatus;
}

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" }
];

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "furniture", label: "Furniture" },
  { value: "groceries", label: "Groceries" },
  { value: "toys", label: "Toys" }
];

export default function Taxes() {
  const [taxes, setTaxes] = useState<Tax[]>([
    {
      id: 1,
      name: "California Sales Tax",
      rate: 7.25,
      country: "us",
      region: "California",
      productCategories: ["electronics", "furniture", "clothing"],
      status: "active"
    },
    {
      id: 2,
      name: "UK VAT Standard",
      rate: 20,
      country: "uk",
      region: "All",
      productCategories: ["electronics", "furniture", "clothing", "books", "toys"],
      status: "active"
    },
    {
      id: 3,
      name: "Canada GST",
      rate: 5,
      country: "ca",
      region: "All",
      productCategories: ["electronics", "furniture", "clothing", "books", "toys", "groceries"],
      status: "active"
    }
  ]);
  
  const [isAddTaxOpen, setIsAddTaxOpen] = useState(false);
  const [isEditTaxOpen, setIsEditTaxOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
  const [formValues, setFormValues] = useState<TaxFormValues>({
    name: "",
    rate: 0,
    country: "",
    region: "",
    productCategories: [],
    status: "active"
  });
  
  const { toast } = useToast();
  
  const handleOpenAddTax = () => {
    setFormValues({
      name: "",
      rate: 0,
      country: "",
      region: "",
      productCategories: [],
      status: "active"
    });
    setIsAddTaxOpen(true);
  };
  
  const handleOpenEditTax = (tax: Tax) => {
    setSelectedTax(tax);
    setFormValues({
      name: tax.name,
      rate: tax.rate,
      country: tax.country,
      region: tax.region,
      productCategories: tax.productCategories,
      status: tax.status
    });
    setIsEditTaxOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "rate") {
      setFormValues({
        ...formValues,
        [name]: Number(value)
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string | string[]) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  const handleAddTax = () => {
    const newTax: Tax = {
      id: taxes.length > 0 ? Math.max(...taxes.map(t => t.id)) + 1 : 1,
      name: formValues.name,
      rate: Number(formValues.rate),
      country: formValues.country,
      region: formValues.region,
      productCategories: formValues.productCategories,
      status: formValues.status
    };
    
    setTaxes([...taxes, newTax]);
    setIsAddTaxOpen(false);
    
    toast({
      title: "Tax Rate Added",
      description: `${newTax.name} has been added successfully.`,
    });
  };
  
  const handleUpdateTax = () => {
    if (!selectedTax) return;
    
    setTaxes(taxes.map(tax => 
      tax.id === selectedTax.id 
        ? { 
            ...tax, 
            name: formValues.name,
            rate: Number(formValues.rate),
            country: formValues.country,
            region: formValues.region,
            productCategories: formValues.productCategories,
            status: formValues.status 
          }
        : tax
    ));
    
    setIsEditTaxOpen(false);
    
    toast({
      title: "Tax Rate Updated",
      description: `${formValues.name} has been updated successfully.`,
    });
  };
  
  const handleDeleteTax = (id: number) => {
    setTaxes(taxes.filter(tax => tax.id !== id));
    
    toast({
      title: "Tax Rate Deleted",
      description: "The tax rate has been deleted successfully.",
    });
  };
  
  const getCountryName = (code: string) => {
    return countries.find(country => country.value === code)?.label || code;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tax Rates</h2>
          <p className="text-muted-foreground">
            Manage tax rates and configurations for different regions
          </p>
        </div>
        <Button onClick={handleOpenAddTax}>Add New Tax Rate</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rate (%)</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxes.map(tax => (
              <TableRow key={tax.id}>
                <TableCell className="font-medium">{tax.name}</TableCell>
                <TableCell>{tax.rate}%</TableCell>
                <TableCell>{getCountryName(tax.country)}</TableCell>
                <TableCell>{tax.region}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {tax.productCategories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="outline" className="capitalize">
                        {category}
                      </Badge>
                    ))}
                    {tax.productCategories.length > 2 && (
                      <Badge variant="outline">+{tax.productCategories.length - 2} more</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={tax.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} variant="outline">
                    {tax.status.charAt(0).toUpperCase() + tax.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenEditTax(tax)}
                    >
                      Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Tax Rate</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{tax.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteTax(tax.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Tax Dialog */}
      <Dialog open={isAddTaxOpen} onOpenChange={setIsAddTaxOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tax Rate</DialogTitle>
            <DialogDescription>
              Create a new tax rate for your store
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="e.g., New York Sales Tax"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rate" className="text-right">
                Rate (%)
              </Label>
              <Input
                id="rate"
                name="rate"
                type="number"
                className="col-span-3"
                value={formValues.rate}
                onChange={handleInputChange}
                min={0}
                step={0.01}
                placeholder="e.g., 8.875"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Country</Label>
              <Select 
                value={formValues.country} 
                onValueChange={(value) => handleSelectChange('country', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map(country => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region" className="text-right">
                Region
              </Label>
              <Input
                id="region"
                name="region"
                className="col-span-3"
                value={formValues.region}
                onChange={handleInputChange}
                placeholder="e.g., New York State or 'All' for country-wide"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Categories</Label>
              <Select 
                value={formValues.productCategories} 
                onValueChange={(value: string[]) => handleSelectChange('productCategories', value)}
                multiple
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select product categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select 
                value={formValues.status} 
                onValueChange={(value: TaxStatus) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaxOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTax}>
              Create Tax Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Tax Dialog */}
      <Dialog open={isEditTaxOpen} onOpenChange={setIsEditTaxOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tax Rate</DialogTitle>
            <DialogDescription>
              Update the details of this tax rate
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                className="col-span-3"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-rate" className="text-right">
                Rate (%)
              </Label>
              <Input
                id="edit-rate"
                name="rate"
                type="number"
                className="col-span-3"
                value={formValues.rate}
                onChange={handleInputChange}
                min={0}
                step={0.01}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Country</Label>
              <Select 
                value={formValues.country} 
                onValueChange={(value) => handleSelectChange('country', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map(country => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-region" className="text-right">
                Region
              </Label>
              <Input
                id="edit-region"
                name="region"
                className="col-span-3"
                value={formValues.region}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Categories</Label>
              <Select 
                value={formValues.productCategories} 
                onValueChange={(value: string[]) => handleSelectChange('productCategories', value)}
                multiple
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select product categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select 
                value={formValues.status} 
                onValueChange={(value: TaxStatus) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTaxOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTax}>
              Update Tax Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
