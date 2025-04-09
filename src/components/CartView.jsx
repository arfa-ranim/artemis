import { useState } from "react";  
import { cn } from "@/lib/utils";  
import { Button } from "@/components/ui/button";  
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";  

export const CartView = () => {  
  const [activeTab, setActiveTab] = useState("new");  

  return (  
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">  
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">  
        Your Cart  
      </h2>  

      <Tabs defaultValue="new" className="w-full">  
        <TabsList className="w-full mb-6">  
          <TabsTrigger  
            value="new"  
            className={cn(  
              "flex-1",  
              activeTab === "new" && "bg-amber-500 text-white"  
            )}  
            onClick={() => setActiveTab("new")}  
          >  
            New Orders  
          </TabsTrigger>  
          <TabsTrigger  
            value="all"  
            className={cn(  
              "flex-1",  
              activeTab === "all" && "bg-amber-500 text-white"  
            )}  
            onClick={() => setActiveTab("all")}  
          >  
            All Orders  
          </TabsTrigger>  
        </TabsList>  

        <TabsContent value="new">  
          <div className="space-y-4">  
            <EmptyState message="No new orders yet" />  
          </div>  
        </TabsContent>  

        <TabsContent value="all">  
          <div className="space-y-4">  
            <EmptyState message="No previous orders" />  
          </div>  
        </TabsContent>  
      </Tabs>  
    </div>  
  );  
};  

const EmptyState = ({ message }) => (  
  <div className="text-center py-12">  
    <p className="text-gray-500">{message}</p>  
    <Button className="mt-4 bg-amber-500 hover:bg-amber-600">  
      Continue Shopping  
    </Button>  
  </div>  
);  

