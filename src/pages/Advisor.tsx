import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Advisor() {
  const studentPlans = [
    {
      id: 1,
      studentName: "Sara Ahmad",
      studentId: "CS2021-001",
      semester: "Fall 2025",
      status: "pending",
      courses: ["CS401", "CS402", "CS403", "MATH301"],
      submittedDate: "2024-01-15",
      notes: "Requesting advanced track approval",
    },
    {
      id: 2,
      studentName: "Abdulrahman Alnsour",
      studentId: "CS2021-002",
      semester: "Fall 2025",
      status: "approved",
      courses: ["CS301", "CS302", "MATH201", "PHY101"],
      submittedDate: "2024-01-14",
      approvedDate: "2024-01-15",
    },
    {
      id: 3,
      studentName: "Amer Dababneh",
      studentId: "CS2022-001",
      semester: "Fall 2025",
      status: "rejected",
      courses: ["CS501", "CS502"],
      submittedDate: "2024-01-13",
      rejectedDate: "2024-01-14",
      rejectionReason: "Prerequisites not completed",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending Review</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "pending":
        return <Clock className="h-5 w-5 text-warning" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const filterByStatus = (status: string) => {
    if (status === "all") return studentPlans;
    return studentPlans.filter((plan) => plan.status === status);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Advisor Dashboard</h2>
        <p className="text-muted-foreground">Review and approve student study plans</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {filterByStatus("pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {filterByStatus("approved").length}
                </p>
                <p className="text-sm text-muted-foreground">Approved This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {filterByStatus("rejected").length}
                </p>
                <p className="text-sm text-muted-foreground">Requires Revision</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Plans</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {["all", "pending", "approved", "rejected"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4">
            {filterByStatus(tabValue === "all" ? "all" : tabValue).map((plan) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-3">
                        {getStatusIcon(plan.status)}
                        {plan.studentName}
                        {getStatusBadge(plan.status)}
                      </CardTitle>
                      <CardDescription>
                        Student ID: {plan.studentId} • {plan.semester}
                      </CardDescription>
                    </div>
                    {plan.status === "pending" && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                        <Button size="sm">
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Requested Courses:</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.courses.map((course) => (
                        <Badge key={course} variant="secondary">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {plan.notes && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Notes:</p>
                      <p className="text-sm text-muted-foreground">{plan.notes}</p>
                    </div>
                  )}
                  {plan.rejectionReason && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm font-medium text-destructive mb-1">Rejection Reason:</p>
                      <p className="text-sm text-destructive/90">{plan.rejectionReason}</p>
                    </div>
                  )}
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Submitted: {new Date(plan.submittedDate).toLocaleDateString()}</span>
                    {plan.approvedDate && (
                      <span>Approved: {new Date(plan.approvedDate).toLocaleDateString()}</span>
                    )}
                    {plan.rejectedDate && (
                      <span>Rejected: {new Date(plan.rejectedDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
