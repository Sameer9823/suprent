"use client";

import { useSyncExternalStore } from "react";
import { properties as seedProperties } from "@/data/properties";
import { facilities as seedFacilities } from "@/data/facilities";
import type { Inquiry } from "@/types/inquiry";
import { createDemoStore } from "./demo-storage";
import { facilitiesArraySchema, inquiriesArraySchema, propertiesArraySchema } from "./validation";

const EMPTY_INQUIRIES: Inquiry[] = [];

export const propertyStore = createDemoStore("supgs.demo.properties.v1", propertiesArraySchema, seedProperties);
export const facilityStore = createDemoStore("supgs.demo.facilities.v1", facilitiesArraySchema, seedFacilities);
export const inquiryStore = createDemoStore("supgs.demo.inquiries.v1", inquiriesArraySchema, EMPTY_INQUIRIES);

export const useProperties = () =>
  useSyncExternalStore(propertyStore.subscribe, propertyStore.getSnapshot, propertyStore.getServerSnapshot);
export const useFacilities = () =>
  useSyncExternalStore(facilityStore.subscribe, facilityStore.getSnapshot, facilityStore.getServerSnapshot);
export const useInquiries = () =>
  useSyncExternalStore(inquiryStore.subscribe, inquiryStore.getSnapshot, inquiryStore.getServerSnapshot);

export function resetAllDemoData() {
  propertyStore.reset();
  facilityStore.reset();
  inquiryStore.reset();
}
