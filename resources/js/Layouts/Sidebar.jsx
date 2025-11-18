import { Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { ScrollArea } from "@mantine/core";

export default function Sidebar({ currentUrl }) {
  const [open, setOpen] = useState({}); // dynamic open state

  const toggle = (name) => {
    setOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };
const fullCurrentUrl = window.location.origin + currentUrl;

  const menuGroups = [
    {
      title: "LAPORAN",
      items: [
        { label: "Dashboard", icon: "mingcute:dashboard-line", path: route("dashboard") },
        { label: "Pemesanan", icon: "lets-icons:order", path: route("dashboard.order") },
        ]
    },
    {
      title: "KONTEN",
      items: [
        {
          label: "Produk",
          icon: "icon-park-outline:ad-product",
          children: [
            { label: "Tipe", icon: "bx:tag", path: route("dashboard.product-type") },
            { label: "Katalog", icon: "fluent-mdl2:product-variant", path: route("dashboard.product") },
            { label: "Promo", icon: "iconamoon:discount", path: route("dashboard.promo") },
          ]
        },
        {
          label: "Perusahaan",
          icon: "mdi:company",
          children: [
            { label: "Company Profile", icon: "gg:profile", path: route("dashboard.company") },
            { label: "Toko", icon: "lucide:store", path: route("dashboard.store") },
            
          ]
        },
         { label: "FAQ", icon: "mingcute:question-line", path: route("dashboard.faq") },
         { label: "Testimoni", icon: "material-symbols:star-outline-rounded", path: route("dashboard.testimoni") },
         { label: "Saran", icon: "tabler:bulb", path: route("dashboard.advice") }
      ]
    }
  ];


  return (
    <aside className="min-w-64 h-screen bg-white flex flex-col">
      <div className="flex justify-center py-4">
        <img src="/icon.png" alt="Logo" width={90} height={90} />
      </div>
      <ScrollArea mih={320} scrollbarSize="10">
      <nav className="flex-1 mb-16">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <div className="px-4">
            <div className="px-4 text-xs font-semibold text-gray-500 tracking-wider mt-4">
              {group.title}
            </div>
            <hr className="my-2 border-gray-200" />
            </div>

            <ul className="mt-1 flex flex-col">
              {group.items.map((item) => {
                if (item.children) {
                  // COLLAPSE
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => toggle(item.label)}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all"
                      >
                        <Icon icon={item.icon} width={24} />
                        {item.label}
                        <Icon
                          icon="mdi:chevron-down"
                          width={24}
                          className={`ml-auto transition-transform ${open[item.label] ? "rotate-180" : ""}`}
                        />
                      </button>

                      {open[item.label] && (
                        <ul className="ml-8 mt-1 flex flex-col">
                          {item.children.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.path}
                                className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded relative ${
                                  fullCurrentUrl === sub.path
                                    ? "bg-tertiary-90 text-primary-main"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {fullCurrentUrl === sub.path && (
                        <div className="absolute h-full w-1 right-0 bg-primary-main rounded-l-2xl"></div>
                      )}
                                <Icon icon={sub.icon} width={24} />
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                // NORMAL MENU
                const active = fullCurrentUrl === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 relative px-4 py-2 text-sm font-medium transition-all ${
                        active
                          ? "bg-tertiary-90 text-primary-main"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {active && (
                        <div className="absolute h-full w-1 right-0 bg-primary-main rounded-l-2xl"></div>
                      )}
                      <Icon icon={item.icon} width={24} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      </ScrollArea>
    </aside>
  );
}
