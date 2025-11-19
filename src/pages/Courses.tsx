import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allCourses, Course } from "@/data/studyPlanData";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || course.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeLabel = (type: Course['type']) => {
    switch (type) {
      case 'university': return 'University Req.';
      case 'faculty': return 'Faculty Req.';
      case 'core': return 'Core';
      case 'elective': return 'Elective';
      default: return type;
    }
  };

  const getTypeBadgeVariant = (type: Course['type']): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
    switch (type) {
      case 'university': return 'secondary';
      case 'faculty': return 'outline';
      case 'core': return 'default';
      case 'elective': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Course Catalog</h2>
        <p className="text-muted-foreground">Browse and search available courses for Computer Information Systems</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find courses from the CIS study plan (132 credit hours total)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by course name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Course Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="university">University Requirements</SelectItem>
                <SelectItem value="faculty">Faculty Requirements</SelectItem>
                <SelectItem value="core">Core Courses</SelectItem>
                <SelectItem value="elective">Elective Courses</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total courses: {filteredCourses.length}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{course.code}</CardTitle>
                      <CardDescription className="mt-1 text-base font-medium text-foreground">
                        {course.name}
                      </CardDescription>
                    </div>
                    <Badge variant={getTypeBadgeVariant(course.type)}>
                      {getTypeLabel(course.type)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Credits</span>
                      <Badge variant="secondary">{course.credits} Credits</Badge>
                    </div>
                    
                    {course.prerequisites.length > 0 && (
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground whitespace-nowrap">Prerequisites:</span>
                        <div className="flex flex-wrap gap-1">
                          {course.prerequisites.map((prereq, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {course.description && (
                      <p className="text-sm text-muted-foreground pt-2">
                        {course.description}
                      </p>
                    )}

                    {course.year && course.semester && (
                      <div className="flex items-center justify-between text-sm pt-2">
                        <span className="text-muted-foreground">Recommended</span>
                        <span className="font-medium">Year {course.year}, Semester {course.semester}</span>
                      </div>
                    )}

                    {course.department && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Department</span>
                        <span className="font-medium">{course.department}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
