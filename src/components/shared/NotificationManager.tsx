"use client";

import { useState, useEffect, useCallback } from "react";
import NotificationSystem, { Notification } from "./NotificationSystem";

export default function NotificationManager() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        const notificationsWithDates = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = useCallback((type: "add" | "edit" | "delete", sectionName: string) => {
    const messages = {
      add: `تم إنشاء قسم جديد: ${sectionName}`,
      edit: `تم تعديل قسم: ${sectionName}`,
      delete: `تم حذف قسم: ${sectionName}`
    };

    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message: messages[type],
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep max 50 notifications
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Expose addNotification function globally
  useEffect(() => {
    (window as any).addNotification = addNotification;
    return () => {
      delete (window as any).addNotification;
    };
  }, [addNotification]);

  return (
    <NotificationSystem
      notifications={notifications}
      onMarkAsRead={markAsRead}
      onClearAll={clearAll}
    />
  );
} 