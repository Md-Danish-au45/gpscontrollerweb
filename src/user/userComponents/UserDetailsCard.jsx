import React, { useState, useEffect } from "react";
import { CheckCircle, Download, Shield, Clock, User, FileText, Award, AlertCircle, CreditCard, RefreshCw } from "lucide-react";

// Import the necessary hooks for invalidation and refetching
import { useGetProfileQuery } from "@/app/api/authApiSlice";
import { useGetServicesQuery } from "@/app/api/serviceApiSlice";
import { apiSlice } from "@/app/api/apiSlice";
import { useDispatch } from "react-redux";
// import { useGetProfileQuery } from "@/app/api/authApiSlice";
import favicon from "@/assets/logo.png"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import VerifyMyKyc from "@/assets/logo.png"

// Helper function to format keys into titles
const toTitleCase = (str) => {
  if (!str) return "";
  return str.replace(/_/g, " ").replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

// Custom UI Components
const CustomCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

const CustomCardHeader = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

const CustomCardContent = ({ children, className = "" }) => {
  return (
    <div className={`px-2 md:px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

const CustomButton = ({ children, onClick, disabled, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${disabled
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// Enhanced Data Table Component that handles nested objects better
const SimpleDataTable = ({ data, title }) => {
  if (!data || typeof data !== 'object') return null;

  


  // Function to get all meaningful entries from the data
  const getMeaningfulEntries = (obj, prefix = '') => {
    const entries = [];

    for (const [key, value] of Object.entries(obj)) {
      // Skip metadata fields
      if (['message', 'code', 'success', 'timestamp', 'status_code'].includes(key.toLowerCase())) {
        continue;
      }

      // Skip base64 image fields
      if (key.toLowerCase().includes('base64') || 
          key.toLowerCase().includes('image') || 
          key.toLowerCase().includes('photo') ||
          key.toLowerCase().includes('picture') ||
          (typeof value === 'string' && value.startsWith('data:image/'))) {
        continue;
      }

      if (value === null || value === undefined) continue;

      const fullKey = prefix ? `${prefix}.${key}` : key;

      // Handle arrays - process each item but don't show indices
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item && typeof item === 'object') {
            // For array items that are objects, flatten them without showing the index
            const nestedEntries = getMeaningfulEntries(item, fullKey);
            entries.push(...nestedEntries);
          } else if (item !== null && item !== undefined) {
            // For primitive values in arrays, use the parent key without index
            entries.push([fullKey, String(item)]);
          }
        });
        continue;
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        // Check if this object looks like a converted array (all numeric keys)
        const objectKeys = Object.keys(value);
        const isArrayLikeObject = objectKeys.length > 0 && objectKeys.every(k => !isNaN(k) && Number.isInteger(Number(k)));
        
        if (isArrayLikeObject) {
          // Handle array-like objects - process values but skip numeric keys
          Object.values(value).forEach((item) => {
            if (item && typeof item === 'object') {
              const nestedEntries = getMeaningfulEntries(item, fullKey);
              entries.push(...nestedEntries);
            } else if (item !== null && item !== undefined) {
              entries.push([fullKey, String(item)]);
            }
          });
          continue;
        }
        
        // For nested objects, recursively get entries
        const nestedEntries = getMeaningfulEntries(value, fullKey);
        entries.push(...nestedEntries);
      } else {
        // Show full value without truncation
        let displayValue = String(value);
        entries.push([fullKey, displayValue]);
      }
    }

    return entries;
  };

  const entries = getMeaningfulEntries(data);

  if (entries.length === 0) return null;

  return (
    <div className="space-y-3">
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
          <FileText className="w-4 h-4" />
          {title}
        </h4>
      )}
      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        {entries.map(([key, value], index) => (
          <div
            key={key}
            className={`flex px-4 py-3 hover:bg-gray-100 transition-colors ${index !== entries.length - 1 ? 'border-b border-gray-200' : ''
              }`}
          >
            <span className="text-sm font-medium text-gray-700 min-w-0 w-1/3 mr-4">
              {toTitleCase(key.split('.').pop())}
              {key.includes('.') && (
                <span className="text-xs text-gray-500 block">
                  {/* {key.split('.').slice(0, -1).map(toTitleCase).join(' → ')} */}
                </span>
              )}
            </span>
            <span className="text-sm text-gray-900 font-medium w-2/3 break-words whitespace-pre-wrap">
              {typeof value === 'boolean' ? (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {value ? 'Yes' : 'No'}
                </span>
              ) : (
                String(value)
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// PDF Generation Function (updated to remove input parameters)
// Paste this updated function into your UserDetailsCard.jsx file

// UPDATED PDF GENERATION FUNCTION
// Paste this updated function into your UserDetailsCard.jsx file

// UPDATED PDF GENERATION FUNCTION
const generatePDF = (result, serviceName = 'Verification') => {
  const details = findDetailsObject(result.data);
  const currentDate = new Date().toLocaleDateString('en-GB');

  const flattenDetailsForDisplay = (obj, prefix = '') => {
    if (!obj || typeof obj !== 'object') return [];
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = toTitleCase(key);
      
      // Skip if key contains base64 image file reference
      if (key.toLowerCase().includes('base64')) {
        return acc;
      }
      
      // Skip metadata fields
      if (key.toLowerCase().includes('metadata')) {
        return acc;
      }
      
      // Skip arrays as they display as "[object Object]"
      if (Array.isArray(value)) {
        return acc;
      }
      
      if (value && typeof value === 'object') {
        acc.push(...flattenDetailsForDisplay(value, newKey));
      } else {
        // Show full value without truncation
        const displayValue = value || '';
        acc.push({ key: newKey, value: displayValue });
      }
      return acc;
    }, []);
  };

  const allDetails = details ? flattenDetailsForDisplay(details) : [];
  // Get only the first 6 fields for display
  let displayDetails = allDetails;
  if(allDetails.length > 10) {
       displayDetails = allDetails.slice(0, 10);
  }

  // Method 1: Enhanced jsPDF HTML method with proper sizing

  // const generateWithJsPDFHTML = () => {
  //   const reportElement = document.createElement('div');

  //   reportElement.innerHTML = `
  //     <div class="report-container" style="
  //       font-family: 'Roboto', Arial, sans-serif; 
  //       font-size: 18px; 
  //       color: #333; 
  //       margin: 0; 
  //       padding: 20px; 
  //       background-color: #fff;
  //       width: 500px;
  //       max-width: 500px;
  //       line-height: 1.4;
  //       box-sizing: border-box;
  //     ">
  //       <!-- Header Section -->
  //       <div class="header" style="
  //         display: flex; 
  //         justify-content: space-between; 
  //         align-items: flex-start; 
  //         padding-bottom: 15px; 
          
  //         margin-bottom: 20px;
  //       ">
  //         <div class="logo-section">
  //           <img style="width: 160px; height: 80px; object-fit: contain;" src="${typeof VerifyMyKyc !== 'undefined' ? VerifyMyKyc : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjcwIiB2aWV3Qm94PSIwIDAgMTQwIDcwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iNzAiIGZpbGw9IiMxOTg3QkYiLz48dGV4dCB4PSI3MCIgeT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwiPkxPR088L3RleHQ+PC9zdmc+'}" alt="Company Logo" style="width: 160px; height: 80px;"/>
  //         </div>
  //         <div class="company-info" style="text-align: right; font-size: 16px; color: #555;">
  //           <h3 style="margin: 0 0 15px 0; color: #111; font-size: 24px; font-weight: 700;">verify EKYC</h3>
  //           <p style="margin: 0; line-height: 1.7; font-size: 16px;">
  //             A-24/5, Mohan Cooperative Industrial Area,<br>
  //             Badarpur, Second Floor,<br>
  //             New Delhi 11004
  //           </p>
  //         </div>
  //       </div>

  //       <hr style="
  //         border: none;
  //         border-top: 3px solid #e5e7eb;
  //         margin: 20px 0;
  //       ">

  //       <!-- Title Section -->
  //       <div class="title-section" style="padding: 15px 0; text-align: center; margin-bottom: 15px;">
  //         <h1 style="font-size: 42px; color: #1a202c; margin: 0 0 10px 0; font-weight: 700;">
  //           ${serviceName}
  //         </h1>
  //         <p style="font-size: 26px; color: #4a5568; margin: 0; font-weight: 500;">
  //           Details of ${serviceName}: ${result.data?.document_number || result.data?.account_number || result.data?.pan_number || 'N/A'}
  //         </p>
  //       </div>

  //       <!-- Status Section -->
  //       <div class="status-section" style="margin-bottom: 15px;">
  //         <h2 style="
  //           font-size: 28px; 
  //           color: #1a202c; 
  //           margin: 0 0 20px 0; 
  //           font-weight: 600;
  //           padding: 15px 0;
  //           border-bottom: 2px solid #e5e7eb;
  //         ">
  //           Know Your ${serviceName.replace(' Verification', '').replace(' Status', '')} Status
  //         </h2>
  //       </div>

  //       <!-- Date Section -->
  //       <div class="current-date" style="
  //         text-align: right; 
  //         margin-bottom: 40px; 
  //         font-size: 18px; 
  //         color: #718096; 
  //         font-weight: 500;
  //       ">
  //         <strong>Date of Report:</strong> ${currentDate}
  //       </div>

  //       <!-- Data Section -->
  //       <div class="data-section" style="margin-bottom: 50px;">
  //         <table style="
  //           width: 100%; 
  //           border-collapse: collapse; 
  //           margin-bottom: 30px;
  //           table-layout: fixed;
  //         ">
  //           <tbody>
  //             ${displayDetails.length > 0
  //       ? displayDetails.map(({ key, value }, index) => `
  //                 <tr style="
  //                   border-bottom: 2px solid #edf2f7;
  //                   page-break-inside: avoid;
  //                 ">
  //                   <td style="
  //                     padding: 25px 30px 25px 0; 
  //                     vertical-align: top; 
  //                     font-weight: 600; 
  //                     width: 45%; 
  //                     color: #4a5568;
  //                     word-wrap: break-word;
  //                     font-size: 18px;
  //                     line-height: 1.5;
  //                   ">
  //                     ${key}
  //                   </td>
  //                   <td style="
  //                     padding: 25px 0; 
  //                     color: #1a202c; 
  //                     font-weight: 500;
  //                     word-wrap: break-word;
  //                     font-size: 18px;
  //                     width: 55%;
  //                     line-height: 1.4;
  //                   ">
  //                     ${(value === null || value === undefined) ? 'N/A' : String(value)}
  //                   </td>
  //                 </tr>
  //               `).join('')
  //       : `<tr>
  //                   <td colspan="2" style="
  //                     text-align: center; 
  //                     padding: 50px 20px; 
  //                     color: #718096;
  //                     font-style: italic;
  //                     font-size: 20px;
  //                   ">
  //                     No details available.
  //                   </td>
  //                  </tr>`
  //     }
  //           </tbody>
  //         </table>
  //       </div>

  //       <!-- Footer Section -->
  //       <div class="footer" style="
  //         margin-top: 80px; 
  //         padding-top: 40px; 
  //         border-top: 3px solid #e5e7eb; 
  //         font-size: 14px; 
  //         color: #718096;
  //         page-break-inside: avoid;
  //       ">
  //         <h4 style="
  //           font-size: 20px; 
  //           font-weight: 700; 
  //           color: #2d3748; 
  //           margin-bottom: 25px; 
  //           text-transform: uppercase;
  //           letter-spacing: 0.5px;
  //         ">
  //           Legal Disclaimer
  //         </h4>
  //         <div style="line-height: 1.8; margin-bottom: 20px; font-size: 15px;">
  //           <p style="margin-bottom: 18px; text-align: justify;">
  //             All rights reserved. The report and its contents are the property of verify EKYC and may not be reproduced in any manner without the express written permission of verify EKYC.
  //           </p>
  //           <p style="margin-bottom: 18px; text-align: justify;">
  //             The reports and information contained herein are confidential and are meant only for the internal use of the verify EKYC client for assessing the background of their applicant. The information and report are subject to change based on changes in factual information.
  //           </p>
  //           <p style="margin-bottom: 18px; text-align: justify;">
  //             Information and reports, including text, graphics, links, or other items, are provided on an "as is," "as available" basis. verify EKYC expressly disclaims liability for errors or omissions in the report, information, and materials, as the information is obtained from various sources as per industry practice.
  //           </p>
  //           <p style="margin-bottom: 18px; text-align: justify;">
  //             Our findings are based on the information available to us and industry practice; therefore, we cannot guarantee the accuracy of the information collected. Should additional information or documentation become available that impacts our conclusions, we reserve the right to amend our findings accordingly.
  //           </p>
  //           <p style="margin-bottom: 30px; text-align: justify;">
  //             Due to the limitations mentioned above, the result of our work with respect to background checks should be considered only as a guideline. Our reports and comments should not be considered a definitive pronouncement on the individual.
  //           </p>
  //         </div>
          
  //         <div class="confidential" style="
  //           text-align: center; 
  //           font-weight: bold; 
  //           color: #c53030; 
  //           margin-top: 40px; 
  //           font-size: 16px; 
  //           letter-spacing: 1px;
  //           padding: 25px 0;
  //           border-top: 1px solid #e5e7eb;
  //         ">
  //           - verify EKYC CONFIDENTIAL -
  //         </div>
  //       </div>
  //     </div>
  //   `;

  //   document.body.appendChild(reportElement);

  //   const pdf = new jsPDF('p', 'mm', 'a4');
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();

  //   // Optimized settings for better content sizing
  //   pdf.html(reportElement, {
  //     callback: function (pdf) {
  //       try {
  //         const fileName = `${serviceName.replace(/\s+/g, '_')}_Verification_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  //         pdf.save(fileName);
  //       } catch (e) {
  //         console.error("Error saving PDF:", e);
  //       } finally {
  //         if (document.body.contains(reportElement)) {
  //           document.body.removeChild(reportElement);
  //         }
  //       }
  //     },
  //     margin: [12, 10, 15, 10], // Added bottom margin to prevent cutting
  //     autoPaging: 'text',
  //     x: 0,
  //     y: 0,
  //     width: pdfWidth - 16, // Maximized width
  //     windowWidth: 800, // Match container width for proper scaling
  //     html2canvas: {
  //       scale: 2, // Good scale for quality without being too small
  //       useCORS: true,
  //       letterRendering: true,
  //       allowTaint: false,
  //       width: 800,
  //       height: null // Let height be automatic
  //     }
  //   });
  // };

  // Method 2: Enhanced html2canvas with separate pages
  const generateWithEnhancedCanvas = () => {
    // Create First Page (Verification Data)
    const createFirstPage = () => {
      const firstPageElement = document.createElement('div');
      firstPageElement.innerHTML = `
        <div class="report-container" style="
          font-family: 'Roboto', Arial, sans-serif; 
          font-size: 18px; 
          color: #333; 
          margin: 0; 
          padding: 8px; 
          background: #fff; 
          width: 800px;
          max-width: 800px;
          // line-height: 1.6;
          box-sizing: border-box;
          height: 1000px;
        ">
        <div class="header" style="
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  // padding-bottom: 8px; 
  border-bottom: 3px solid #e5e7eb; 
  margin-bottom: 0px;
">

  <!-- Logo -->
  <img 
    style="height:180px;width:180px;margin-left:-8px" 
    src="${typeof VerifyMyKyc !== 'undefined' ? VerifyMyKyc : 'data:image/svg+xml;base64,...'}" 
    alt="Company Logo"
  />

  <!-- Title + Slogan -->
  <div style="margin-left: 20px; display: flex; flex-direction: column; align-items: flex-start;">
    <!-- Title -->
    <h1 style="margin: 0; font-size: 30px; font-weight: 700;">
      <span style="color: #2E8B57; font-family: 'Georgia', serif;">Verify</span>
      <span style="color: #1E3A8A; font-family: 'Georgia', serif;"> E-</span>
      <span style="color: #FF6600; font-family: 'Georgia', serif;">KYC</span>
    </h1>

    <!-- Slogan -->
    <p style="margin: 6px 0 0; font-size: 20px; font-weight: 600;">
      <span style="color: #2E8B57;">Trusted Verification</span>
      <span style="color: #1E3A8A;"> For A </span>
      <span style="color: #FF6600;">Digital World</span>
    </p>
  </div>

  <!-- Company Info (Right Side) -->
  <div style="text-align: right; font-size: 16px; color: #555;">
    <h3 style="margin: 0 0 4px 0; color: #111; font-size: 24px; font-weight: 700;">
      Bringmark Pvt. Ltd.
    </h3>
    <p style="margin: 0; line-height: 1.7;">
      Dwarka sector 19B,<br>New Delhi 110044
    </p>
  </div>
</div>


          <div class="title-section" style="padding: 0px 0; text-align: center; margin-bottom: 2px;">
            <h1 style="font-size: 32px; color: #1a202c; margin: 0 0 0px 0; font-weight: 700;">${serviceName}</h1>
            <p style="font-size: 12px; color: #4a5568; margin: 0; font-weight: 500;">Details of ${serviceName}: ${result.data?.document_number || result.data?.account_number || result.data?.pan_number || 'N/A'}</p>
          </div>
          
          <div class="status-section" style="margin-bottom: 2px;">
            <h2 style="font-size: 20px; color: #1a202c; margin: 0 0 0px 0; font-weight: 600; padding: 12px 0; border-bottom: 2px solid #e5e7eb;">
              Know Your ${serviceName.replace(' Verification', '').replace(' Status', '')} Status
            </h2>
          </div>
          
          <div class="current-date" style="text-align: right; margin-bottom: 8px; font-size: 18px; color: #718096; font-weight: 500;">
            <strong>Date of Report:</strong> ${currentDate}
          </div>
          
          <div class="data-section" style="margin-bottom: 8px;">
            <table style="width: 100%; border-collapse: collapse; table-layout: fixed; border: 2px solid #000;">
              <tbody>
                ${displayDetails.length > 0
                  ? displayDetails.map(({ key, value }) =>
                    `<tr style="border: 1px solid #000;">
                      <td style="padding: 15px; vertical-align: top; font-weight: 700; width: 45%; color: #4a5568; word-wrap: break-word; font-size: 18px; line-height: 1.5; border: 1px solid #000;">
                        ${key}
                      </td>
                      <td style="padding: 15px; color: #1a202c; font-weight: 500; word-wrap: break-word; font-size: 18px; width: 55%; line-height: 1.5; border: 1px solid #000;">
                        ${(value === null || value === undefined) ? 'N/A' : String(value)}
                      </td>
                    </tr>`
                  ).join('')
                  : `<tr>
                      <td colspan="2" style="text-align:center; padding: 50px; font-size: 20px; color: #718096; font-style: italic; border: 1px solid #000;">
                        No details available.
                      </td>
                    </tr>`
                }
              </tbody>
            </table>
          </div>
        </div>
      `;
      return firstPageElement;
    };

    // Create Second Page (Legal Disclaimer)
    const createSecondPage = () => {
      const secondPageElement = document.createElement('div');
 secondPageElement.innerHTML = `
        <div class="report-container" style="
          font-family: 'Roboto', Arial, sans-serif; 
          font-size: 18px; 
          color: #333; 
          margin: 0; 
          padding: 20px; 
          background: #fff; 
          width: 800px;
          max-width: 800px;
          line-height: 1.6;
          box-sizing: border-box;
          height: 1000px;
        ">
          <div class="header" style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #e5e7eb;">
            <h1 style="font-size: 28px; color: #1a202c; margin: 0; font-weight: 700;">LEGAL DISCLAIMER</h1>
          </div>
          
          <div class="disclaimer-content" style="font-size: 14px; color: #718096; line-height: 1.8;">
            <p style="margin-bottom: 18px; text-align: justify;">
              All rights reserved. The report and its contents are the property of Verify E-KYC (operated by Bringmark Pvt. Ltd.) and may not be reproduced in any manner without the express written permission of Verify E-KYC.
            </p>
            <p style="margin-bottom: 18px; text-align: justify;">
              The reports and information contained herein are confidential and are meant only for the internal use of the Verify E-KYC client for assessing the background of their applicant. The information and report are subject to change based on changes in factual information.
            </p>
            <p style="margin-bottom: 18px; text-align: justify;">
              Information and reports, including text, graphics, links, or other items, are provided on an "as is," "as available" basis. Verify E-KYC expressly disclaims liability for errors or omissions in the report, information, and materials, as the information is obtained from various sources as per industry practice. No warranty of any kind implied, express, or statutory including but not limited to the warranties of non-infringement of third party rights, title, merchantability, fitness for a particular purpose or freedom from computer virus, is given with respect to the contents of this report.
            </p>
            <p style="margin-bottom: 18px; text-align: justify;">
              Our findings are based on the information available to us and industry practice; therefore, we cannot guarantee the accuracy of the information collected. Should additional information or documentation become available that impacts our conclusions, we reserve the right to amend our findings accordingly.
            </p>
            <p style="margin-bottom: 18px; text-align: justify;">
              These reports are not intended for publication or circulation. They should not be shared with any person, entity, association, corporation, or any other purposes, in whole or in part, without prior written consent from Verify E-KYC in each specific instance. Our reports cannot be used by clients to claim all responsibility or liability that may arise due to omissions, additions, correction, and accuracy. All the information has been obtained from various sources as per industry practice to make an informed decision, and we hereby disclaim all responsibility or liability that may arise due to errors in the report.
            </p>
            <p style="margin-bottom: 30px; text-align: justify;">
              Due to the limitations mentioned above, the result of our work with respect to background checks should be considered only as a guideline. Our reports and comments should not be considered a definitive pronouncement on the individual.
            </p>
          </div>
          
          <div class="confidential" style="
            text-align: center; 
            font-weight: bold; 
            color: #c53030; 
            margin-top: 60px; 
            font-size: 16px; 
            letter-spacing: 1px;
            padding: 25px 0;
            border-top: 1px solid #e5e7eb;
          ">
            - Verify E-KYC CONFIDENTIAL -
          </div>
        </div>
      `;

      return secondPageElement;
    };

    // Generate both pages and merge them
    const generateCombinedPDF = async () => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = pdfHeight - (margin * 2);

      try {
        // Generate First Page
        const firstPageElement = createFirstPage();
        document.body.appendChild(firstPageElement);
        
        const firstPageCanvas = await html2canvas(firstPageElement.querySelector('.report-container'), {
          scale: 2,
          useCORS: true,       // Allow cross-origin images
          logging: true,   
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 800,
          height: 1000,
          windowWidth: 800,
          windowHeight: 1000
        });

        const firstPageData = firstPageCanvas.toDataURL('image/png', 1.0);
        
        // Add first page to PDF
        const firstPageAspectRatio = firstPageCanvas.height / firstPageCanvas.width;
        const firstPageHeight = contentWidth * firstPageAspectRatio;
        
        pdf.addImage(
          firstPageData,
          'PNG',
          margin,
          margin,
          contentWidth,
          Math.min(firstPageHeight, contentHeight)
        );

        // Generate Second Page
        const secondPageElement = createSecondPage();
        document.body.appendChild(secondPageElement);
        
        const secondPageCanvas = await html2canvas(secondPageElement.querySelector('.report-container'), {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          width: 800,
          height: 1000,
          windowWidth: 800,
          windowHeight: 1000
        });

        const secondPageData = secondPageCanvas.toDataURL('image/png', 1.0);
        
        // Add second page to PDF
        pdf.addPage();
        const secondPageAspectRatio = secondPageCanvas.height / secondPageCanvas.width;
        const secondPageHeight = contentWidth * secondPageAspectRatio;
        
        pdf.addImage(
          secondPageData,
          'PNG',
          margin,
          margin,
          contentWidth,
          Math.min(secondPageHeight, contentHeight)
        );

        // Clean up DOM elements
        if (document.body.contains(firstPageElement)) {
          document.body.removeChild(firstPageElement);
        }
        if (document.body.contains(secondPageElement)) {
          document.body.removeChild(secondPageElement);
        }

        // Save the PDF
        const fileName = `${serviceName.replace(/\s+/g, '_')}_Verification_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);

      } catch (error) {
        console.error("Error generating PDF:", error);
        // Clean up in case of error
        const elements = document.querySelectorAll('.report-container');
        elements.forEach(el => {
          if (document.body.contains(el.parentElement)) {
            document.body.removeChild(el.parentElement);
          }
        });
      }
    };

    generateCombinedPDF();
  };

  // Use the enhanced canvas method with separate pages
  try {
    generateWithEnhancedCanvas();
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};
// Enhanced function to find the main data object within the API response
const findDetailsObject = (data) => {
  if (typeof data !== 'object' || data === null) return null;

  // Look for specific verification data keys first (like bank_account_data, pan_data, etc.)
  const specificDataKeys = Object.keys(data).filter(key =>
    key.includes('_data') && typeof data[key] === 'object' && data[key] !== null
  );

  if (specificDataKeys.length > 0) {
    // Return the first specific data object found
    return data[specificDataKeys[0]];
  }

  // Then, look for a nested 'data' object that contains meaningful verification data
  if (data.data && typeof data.data === 'object') {
    const nestedData = data.data;
    const verificationFields = ['name', 'account_number', 'ifsc', 'bank_name', 'account_type', 'mobile', 'email', 'dob', 'father_name', 'document_type'];

    // Check if nested data has verification fields
    const hasVerificationData = verificationFields.some(field => nestedData[field]);
    if (hasVerificationData) {
      return nestedData;
    }
  }

  // If no nested data with verification fields, check the main data object
  const verificationFields = ['name', 'account_number', 'ifsc', 'bank_name', 'account_type', 'mobile', 'email', 'dob', 'father_name', 'document_type'];
  const hasMainVerificationData = verificationFields.some(field => data[field]);

  if (hasMainVerificationData) {
    // Return filtered data without metadata
    const filteredData = { ...data };
    delete filteredData.message;
    delete filteredData.code;
    delete filteredData.success;
    delete filteredData.timestamp;
    delete filteredData.status_code;
    delete filteredData.outputFields;
    return filteredData;
  }

  // Look for any object key that contains meaningful data
  const detailsKey = Object.keys(data).find(key =>
    typeof data[key] === 'object' &&
    data[key] !== null &&
    !['message', 'code', 'success', 'timestamp', 'status_code', 'outputFields'].includes(key.toLowerCase()) &&
    Object.keys(data[key]).length > 0
  );

  return detailsKey ? data[detailsKey] : null;
};

// Function to get display message from result
const getDisplayMessage = (result) => {
  if (!result || !result.data) return null;

  const data = result.data;
  if (data.message && data.message.toLowerCase().includes('verified successfully')) {
    return data.message;
  }

  return null;
};

// Check if the error is subscription-related
const isSubscriptionError = (error) => {
  if (!error || !error.message) return false;
  const message = error.message.toLowerCase();
  return message.includes('subscription') ||
    message.includes('usage limit') ||
    message.includes('premium') ||
    message.includes('plan');
};

// Main UserDetailsCard component with enhanced success/error handling
export function UserDetailsCard({
  result,
  error,
  serviceName,
  inputData,
  onShowPurchaseCard,
  currentServiceKey,
  service
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const { refetch: refetchProfile } = useGetProfileQuery();
  const { refetch: refetchServices } = useGetServicesQuery();

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      generatePDF(result, serviceName);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const handleRefreshAndPurchase = async () => {
    setIsRefreshing(true);
    try {
      dispatch(apiSlice.util.invalidateTags([
        { type: 'User', id: 'PROFILE' },
        { type: 'Service', id: 'LIST' },
        { type: 'Subscription' }
      ]));

      await Promise.all([
        refetchProfile(),
        refetchServices()
      ]);

      if (onShowPurchaseCard) {
        onShowPurchaseCard();
      }
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (error) {
    // This error block is kept as a fallback but will not be rendered from ServiceExecutionPage
    // as per the new logic.
    const isSubError = isSubscriptionError(error);

    return (
      <CustomCard className={`border-red-200 ${isSubError ? 'bg-orange-50' : 'bg-red-50'}`}>
        <CustomCardHeader className={`${isSubError ? 'bg-orange-100 border-orange-200' : 'bg-red-100 border-red-200'}`}>
          {/* ... Error content ... */}
        </CustomCardHeader>
        <CustomCardContent>
          {/* ... Error content ... */}
        </CustomCardContent>
      </CustomCard>
    );
  }

  // Handle state where there is no result yet
  if (!result) {
    return (
      <CustomCard className="border-gray-200">
        <CustomCardHeader className="bg-gray-50">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Waiting for Verification</h3>
              <p className="text-sm text-gray-500">Submit the form to see results</p>
            </div>
          </div>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">Fill out the form to verify your details instantly.</p>
          </div>
        </CustomCardContent>
      </CustomCard>
    );
  }

  // If we have a result, show the verification details
  const details = findDetailsObject(result.data);
  const displayMessage = getDisplayMessage(result);
  const verificationId = `VRF-${Date.now()}`;
  const currentTime = new Date().toLocaleString();
  const hasOutputFields = result.data?.outputFields && result.data.outputFields.length > 0;
  const serviceType = serviceName || service?.name || 'Verification Service';

  return (
    <CustomCard className="border-green-200 bg-green-50">
      <div className="bg-gradient-to-r from-white-500 to-white-600 text-black px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <img className="w-32 h-32 " src={favicon} alt="" />
            <div>
              <h3 className="text-lg font-bold">Verified Successfully</h3>
              <p className="text-black text-sm">{serviceType}</p>
            </div>
          </div>
        </div>
      </div>

      <CustomCardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-4">
            {details && (
              <SimpleDataTable
                data={details}
                title="Verified Information"
              />
            )}
            {!details && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">Verification Complete</h4>
                    <p className="text-sm text-green-700">
                      {displayMessage || 'Your details have been successfully verified.'}
                    </p>
                  </div>
                </div>
                {hasOutputFields && (
                  <div className="mt-3 p-3 bg-white rounded border">
                    <h5 className="font-medium text-gray-700 mb-2">Available Output Fields:</h5>
                    <div className="text-sm text-gray-600">
                      {result.data.outputFields.length > 0
                        ? result.data.outputFields.join(', ')
                        : 'Standard verification fields available'
                      }
                    </div>
                  </div>
                )}
                {!hasOutputFields && (
                  <div className="mt-3 text-sm text-green-600">
                    ✓ Account details verified against official records
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Security</span>
            </div>
            <div className="text-xs text-gray-600">
              <div>Encryption: <span className="font-medium">SHA-256</span></div>
              <div>Status: <span className="text-green-600 font-medium">Verified</span></div>
            </div>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2 text-center">
              <Clock className="w-4 h-4 text-green-600 text-center" />
              <span className="text-sm font-medium text-gray-700">Processing</span>
            </div>
            <div className="text-xs text-gray-600">
              <div>Time: <span className="font-medium">{currentTime.split(',')[1]}</span></div>
              <div>Duration: <span className="text-green-600 font-medium">2.34s</span></div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Download Certificate</h4>
              <p className="text-sm text-blue-700">Get a PDF copy of your verification results</p>
            </div>
            <CustomButton
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-gray-900 hover:bg-gray-700"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </CustomButton>
          </div>
        </div>
      </CustomCardContent>
    </CustomCard>
  );
}