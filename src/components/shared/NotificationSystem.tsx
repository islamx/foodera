"use client";

import { useState } from "react";
import { FaBell, FaTimes, FaTrash } from "react-icons/fa";
import Button from "./Button";

export interface Notification {
  id: string;
  type: "add" | "edit" | "delete";
  message: string;
  timestamp: Date;
  read: boolean;
}

type NotificationSystemProps = {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
};

export default function NotificationSystem({ notifications, onMarkAsRead, onClearAll }: NotificationSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "الآن";
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "add":
        return "➕";
      case "edit":
        return "✏️";
      case "delete":
        return "🗑️";
      default:
        return "📢";
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon with Counter */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors border-none shadow-none"
      >
        <FaBell size={20} className="text-gray-500 hover:text-yellow-500" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">الإشعارات</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClearAll}
                  className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="مسح الكل"
                >
                  <FaTrash size={12} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title="إغلاق"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                لا توجد إشعارات جديدة
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 mb-1">{notification.message}</p>
                      <p className="text-xs text-gray-500">{formatTime(notification.timestamp)}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
} 