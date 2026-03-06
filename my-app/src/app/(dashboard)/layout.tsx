import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
