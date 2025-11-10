import { Award, BookOpen, Calendar, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const upcomingCourses = [
    { id: 1, code: "CS401", name: "Advanced Algorithms", semester: "Fall 2024", credits: 4 },
    { id: 2, code: "CS402", name: "Machine Learning", semester: "Fall 2024", credits: 4 },
    { id: 3, code: "CS403", name: "Database Systems", semester: "Fall 2024", credits: 3 },
  ];

  const recentActivity = [
    { id: 1, action: "Plan approved by advisor", time: "2 hours ago", type: "success" },
    { id: 2, action: "New course recommendation available", time: "5 hours ago", type: "info" },
    { id: 3, action: "CS401 prerequisite completed", time: "1 day ago", type: "success" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Track your academic progress and upcoming courses</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Completed Credits"
          value="84"
          icon={Award}
          description="Out of 120 required"
          trend="+12 this semester"
          trendUp={true}
        />
        <StatCard
          title="Current GPA"
          value="3.7"
          icon={TrendingUp}
          description="Cumulative"
          trend="+0.2 from last semester"
          trendUp={true}
        />
        <StatCard
          title="Enrolled Courses"
          value="5"
          icon={BookOpen}
          description="Fall 2024"
        />
        <StatCard
          title="Graduation Progress"
          value="70%"
          icon={Calendar}
          description="Expected: May 2025"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Study Plan Progress</CardTitle>
            <CardDescription>Your path to graduation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Core Courses</span>
                <span className="font-medium">8/10 completed</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Electives</span>
                <span className="font-medium">6/8 completed</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">General Education</span>
                <span className="font-medium">12/12 completed</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Courses</CardTitle>
            <CardDescription>Registered for Fall 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{course.code}</p>
                    <p className="text-sm text-muted-foreground">{course.name}</p>
                  </div>
                  <Badge variant="secondary">{course.credits} Credits</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates on your academic journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className={`h-2 w-2 rounded-full ${activity.type === 'success' ? 'bg-success' : 'bg-primary'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
