'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { useGeoStore } from '@/hooks/use-geo-store';
import { ColorRule } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ColorRuleForm } from './color-rule-form';
import { PlusCircle, Trash2, Thermometer, MapPin } from 'lucide-react';
import { Logo } from './logo';
import InitialZoomAdvisor from './initial-zoom-advisor';
import { ScrollArea } from './ui/scroll-area';

export default function Sidebar() {
  const { state, dispatch } = useGeoStore();
  const [isRuleFormOpen, setIsRuleFormOpen] = useState(false);

  const handleToggleDrawing = () => {
    dispatch({ type: 'TOGGLE_DRAWING' });
  };
  
  const handleFinishDrawing = () => {
    if(state.currentPolygonPoints.length < 3) return;
    dispatch({ type: 'FINISH_DRAWING' });
  }

  const handleAddRule = (rule: Omit<ColorRule, 'id'>) => {
    dispatch({ type: 'ADD_RULE', payload: rule });
  };
  
  const handleDeleteRule = (id: string) => {
    dispatch({ type: 'DELETE_RULE', payload: id });
  }

  const handleDeletePolygon = (id: string) => {
    dispatch({ type: 'DELETE_POLYGON', payload: id });
  }

  const handleDeleteAllPolygons = () => {
    dispatch({ type: 'DELETE_ALL_POLYGONS' });
  }


  return (
    <aside className="w-80 lg:w-96 bg-card border-r flex flex-col h-screen">
      <div className="p-4">
        <Logo />
      </div>
      <Separator />

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Drawing Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleToggleDrawing} variant={state.isDrawing ? 'destructive' : 'default'} className="w-full">
                {state.isDrawing ? 'Cancel Drawing' : 'Start Drawing'}
              </Button>
              {state.isDrawing && (
                <Button onClick={handleFinishDrawing} disabled={state.currentPolygonPoints.length < 3} className="w-full">
                  Finish Drawing ({state.currentPolygonPoints.length}/12 points)
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Color Rules</CardTitle>
              <Dialog open={isRuleFormOpen} onOpenChange={setIsRuleFormOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Color Rule</DialogTitle>
                  </DialogHeader>
                  <ColorRuleForm onSave={handleAddRule} onClose={() => setIsRuleFormOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.rules.length === 0 && <p className="text-sm text-muted-foreground">No rules defined.</p>}
              {state.rules.map((rule, index) => (
                <div key={rule.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-background">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: rule.color }} />
                    <span>
                      {rule.min ?? '-∞'} &lt; T &lt; {rule.max ?? '+∞'}
                    </span>
                  </div>
                   <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDeleteRule(rule.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Polygons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.polygons.length === 0 && <p className="text-sm text-muted-foreground">No polygons drawn.</p>}
              {state.polygons.map((polygon, index) => (
                 <div key={polygon.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-background">
                  <div className="flex items-center gap-2">
                     <MapPin className="h-4 w-4" style={{ color: polygon.color }} />
                     <span className="font-medium">Polygon {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Thermometer className="h-4 w-4" />
                      <span>{polygon.averageTemperature?.toFixed(1) ?? 'N/A'}°C</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDeletePolygon(polygon.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                 </div>
              ))}
              {state.polygons.length > 0 && (
                <>
                  <Separator className="my-2" />
                  <Button variant="outline" className="w-full" onClick={handleDeleteAllPolygons}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete All Polygons
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
      
      <InitialZoomAdvisor />

    </aside>
  );
}
