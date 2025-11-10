import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Study Plan Approved",
      message: "Your Fall 2024 study plan has been approved by your advisor.",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "New Course Recommendation",
      message: "Based on your progress, we recommend CS402 (Machine Learning) for next semester.",
      timestamp: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Registration Deadline Approaching",
      message: "Don't forget to register for Fall 2024 courses. Deadline: January 31, 2024.",
      timestamp: "1 day ago",
      read: false,
    },
    {
      id: 4,
      type: "success",
      title: "Prerequisite Completed",
      message: "You've successfully completed CS301, unlocking CS402 for registration.",
      timestamp: "1 day ago",
      read: true,
    },
    {
      id: 5,
      type: "error",
      title: "Course Conflict Detected",
      message: "CS401 and MATH301 have overlapping schedules. Please revise your plan.",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: 6,
      type: "info",
      title: "Advisor Meeting Scheduled",
      message: "Your advisor meeting is scheduled for January 20, 2024 at 2:00 PM.",
      timestamp: "3 days ago",
      read: true,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "error":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge className="bg-success text-success-foreground">Success</Badge>;
      case "error":
        return <Badge variant="destructive">Alert</Badge>;
      case "warning":
        return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
      case "info":
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Notifications</h2>
          <p className="text-muted-foreground">Stay updated on your academic journey</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline">Mark All as Read</Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Summary</CardTitle>
          <CardDescription>You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Notifications
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{notification.title}</h4>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      {getTypeBadge(notification.type)}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                      {!notification.read && (
                        <Button variant="ghost" size="sm">
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-3">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <p className="text-muted-foreground">All caught up! No unread notifications.</p>
              </CardContent>
            </Card>
          ) : (
            unreadNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className="hover:shadow-md transition-shadow border-l-4 border-l-primary"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{notification.title}</h4>
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        {getTypeBadge(notification.type)}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                        <Button variant="ghost" size="sm">
                          Mark as Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-3">
          {readNotifications.map((notification) => (
            <Card key={notification.id} className="hover:shadow-md transition-shadow opacity-75">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      {getTypeBadge(notification.type)}
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
