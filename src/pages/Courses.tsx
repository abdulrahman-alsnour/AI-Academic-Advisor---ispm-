import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");

  const courses = [
    {
      id: 1,
      code: "CS401",
      name: "Advanced Algorithms",
      department: "Computer Science",
      credits: 4,
      prerequisites: ["CS201", "CS202"],
      description: "Study of advanced algorithmic techniques and complexity analysis.",
      availability: "Fall 2024",
      enrolled: 28,
      capacity: 35,
      eligible: true,
    },
    {
      id: 2,
      code: "CS402",
      name: "Machine Learning",
      department: "Computer Science",
      credits: 4,
      prerequisites: ["CS301", "MATH210"],
      description: "Introduction to machine learning algorithms and applications.",
      availability: "Fall 2024",
      enrolled: 32,
      capacity: 35,
      eligible: true,
    },
    {
      id: 3,
      code: "CS403",
      name: "Database Systems",
      department: "Computer Science",
      credits: 3,
      prerequisites: ["CS201"],
      description: "Design and implementation of modern database systems.",
      availability: "Fall 2024",
      enrolled: 25,
      capacity: 30,
      eligible: true,
    },
    {
      id: 4,
      code: "CS501",
      name: "Advanced AI",
      department: "Computer Science",
      credits: 4,
      prerequisites: ["CS402", "CS403"],
      description: "Deep dive into artificial intelligence and neural networks.",
      availability: "Spring 2025",
      enrolled: 0,
      capacity: 30,
      eligible: false,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = department === "all" || course.department === department;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Course Catalog</h2>
        <p className="text-muted-foreground">Browse and search available courses</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find the perfect courses for your study plan</CardDescription>
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
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{course.code}</CardTitle>
                    <Badge variant={course.eligible ? "default" : "secondary"}>
                      {course.eligible ? "Eligible" : "Prerequisites Required"}
                    </Badge>
                    <Badge variant="outline">{course.credits} Credits</Badge>
                  </div>
                  <CardDescription className="text-base font-medium text-foreground">
                    {course.name}
                  </CardDescription>
                </div>
                <Button variant={course.eligible ? "default" : "outline"} disabled={!course.eligible}>
                  {course.eligible ? "Enroll" : "View Prerequisites"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Department: </span>
                  <span className="font-medium">{course.department}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Availability: </span>
                  <span className="font-medium">{course.availability}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Enrollment: </span>
                  <span className="font-medium">{course.enrolled}/{course.capacity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Prerequisites: </span>
                  <span className="font-medium">{course.prerequisites.join(", ")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
