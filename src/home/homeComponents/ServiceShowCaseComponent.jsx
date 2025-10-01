"use client";

import React from 'react';
import ServiceCard from './ServiceShowcaseCard.jsx';
import { Shield, Building2, Landmark, GraduationCap, FileSignature, Home } from "lucide-react";

export default function ServicesShowcase() {
const servicesData = [
  {
    id: 1,
    layout: 'image-right',
    theme: {
      primary: 'from-sky-400 to-blue-500',
      badgeBg: 'from-sky-100 to-blue-100',
      badgeText: 'text-sky-700',
      shadow: 'shadow-sky-200 hover:shadow-sky-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300848/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_1_ia11bx.png",
    badgeIcon: Shield,
    badgeText: 'GOVERNMENT ID VERIFICATION',
    titleLines: ['Government ID Verification Service in India | Aadhaar, PAN, Voter ID, DL'],
    typewriterTexts: [
      "Verify Aadhaar, PAN, Voter ID & Driving License online instantly.",
      "Prevent identity fraud with 99.9% accurate government ID checks.",
      "Trusted government ID verification solution for businesses in India.",
    ],
    features: [
      "Instant Aadhaar, PAN, Voter ID, Driving License verification",
      "Real-time government ID check with secure process",
      "99.9% accuracy in ID verification",
      "Trusted KYC & ID verification provider in India",
    ],
    ctaText: 'Explore ID Verification',
    navTo: '/services/government-id-verification'
  },
  {
    id: 2,
    layout: 'image-left',
    theme: {
      primary: 'from-purple-500 to-pink-600',
      badgeBg: 'from-purple-100 to-pink-100',
      badgeText: 'text-purple-700',
      shadow: 'shadow-purple-200 hover:shadow-purple-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300945/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_zemuzw.png",
    badgeIcon: Building2,
    badgeText: 'COMPANY & CREDENTIALS',
    titleLines: ['Company Credential Verification Services | GST, FSSAI, MSME, ROC'],
    typewriterTexts: [
      "Check GST Registration, FSSAI License, MSME Certificate & ROC records online.",
      "Verify business credentials and prevent fraud easily.",
      "Ensure company compliance with government regulations.",
    ],
    features: [
      "Instant GST, FSSAI, MSME & ROC verification",
      "Check if a business is genuine and active in India",
      "Trusted company KYC & fraud detection",
      "Real-time business compliance verification",
    ],
    ctaText: 'Explore Business Verification',
    navTo: '/services/company-credential-verification'
  },
  {
    id: 3,
    layout: 'image-right',
    theme: {
      primary: 'from-emerald-500 to-green-600',
      badgeBg: 'from-emerald-100 to-green-100',
      badgeText: 'text-emerald-700',
      shadow: 'shadow-emerald-200 hover:shadow-emerald-300',
    },
    image: "https://res.cloudinary.com/self-taken/image/upload/v1759074310/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_kitqkg.png",
    badgeIcon: Landmark,
    badgeText: 'BANK ACCOUNT VERIFICATION',
    titleLines: ['Instant Bank Account Verification in India | Prevent Payment Fraud'],
    typewriterTexts: [
      "Verify beneficiary bank accounts instantly before transfers.",
      "Reduce payment fraud with real-time bank account checks.",
      "Secure and reliable bank account verification service in India.",
    ],
    features: [
      "Instant bank account & IFSC code validation",
      "Verify account holder before processing payments",
      "Supports all major Indian banks securely",
      "Fraud prevention with real-time bank verification",
    ],
    ctaText: 'Explore Bank Verification',
    navTo: '/services/bank-verification'
  },
  {
    id: 4,
    layout: 'image-left',
    theme: {
      primary: 'from-red-500 to-amber-600',
      badgeBg: 'from-red-100 to-amber-100',
      badgeText: 'text-red-700',
      shadow: 'shadow-red-200 hover:shadow-red-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300924/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_4_dn8974.png",
    badgeIcon: GraduationCap,
    badgeText: 'EDUCATION VERIFICATION',
    titleLines: ['Education Verification Services in India | Degree, Diploma, Certificate'],
    typewriterTexts: [
      "Check degree, diploma & certificate authenticity online.",
      "Prevent resume fraud with trusted academic verification.",
      "Education verification trusted by recruiters & employers in India.",
    ],
    features: [
      "University & board certificate verification",
      "Fast turnaround for HR recruitment & onboarding",
      "Trusted by employers for academic checks",
      "100% verified education credentials",
    ],
    ctaText: 'Explore Education Verification',
    navTo: '/services/education-verification'
  },
  {
    id: 5,
    layout: 'image-right',
    theme: {
      primary: 'from-blue-500 to-indigo-600',
      badgeBg: 'from-blue-100 to-indigo-100',
      badgeText: 'text-blue-700',
      shadow: 'shadow-blue-200 hover:shadow-blue-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300884/Dreaming_of_a_Career_in_Beauty_Get_Trained_by_Experts_100_Job_Assistance_2_wgmtxg.png",
    badgeIcon: FileSignature,
    badgeText: 'DIGITAL SIGNATURE & eSIGN',
    titleLines: ['Digital Signature & Aadhaar eSign in India | Legally Valid & Secure'],
    typewriterTexts: [
      "Sign documents instantly with Aadhaar-based eSign.",
      "Legally valid digital signatures under IT Act, 2000.",
      "Secure & paperless digital signing solution for businesses.",
    ],
    features: [
      "Instant Aadhaar-based eSign for documents",
      "Paperless digital workflow & signing",
      "Easy to integrate into business processes",
      "Legally compliant with IT Act 2000",
    ],
    ctaText: 'Explore Digital Signature',
    navTo: '/services/digital-signature'
  },
  {
    id: 6,
    layout: 'image-left',
    theme: {
      primary: 'from-orange-500 to-amber-600',
      badgeBg: 'from-orange-100 to-amber-100',
      badgeText: 'text-orange-700',
      shadow: 'shadow-orange-200 hover:shadow-orange-300',
    },
    image: "https://res.cloudinary.com/dz10btkpg/image/upload/v1757300961/lindin_cover_otpn67.png",
    badgeIcon: Home,
    badgeText: 'PROPERTY & LAND RECORDS',
    titleLines: ['Property & Land Record Verification India | Ownership & Encumbrance Check'],
    typewriterTexts: [
      "Verify property ownership and land records instantly.",
      "Check for loans, disputes & encumbrances before buying property.",
      "Trusted property verification service to prevent real estate fraud.",
    ],
    features: [
      "Verify land & property ownership records online",
      "Check encumbrances before buying property",
      "Validate property title deeds securely",
      "Fraud prevention in real estate transactions",
    ],
    ctaText: 'Explore Property Verification',
    navTo: '/services/property-verification'
  }
];




  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-white py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Comprehensive Verification Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our powerful APIs and seamless integrations ensure fast, accurate, and secure identity and credential verification for your business.
          </p>
        </div>
        <div className="space-y-20">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} data={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
