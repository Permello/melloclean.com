# Feature: Invoices

> View invoices, filter by status/date, view detail, download as PDF.

## Overview

Clients can browse their invoice history in a sortable/filterable table, view full invoice details with line items, and download invoices as PDF files. Invoices are linked to completed appointments and include service add-on breakdowns.

## Decisions

| Decision | Choice |
|----------|--------|
| View | DataTable with sortable columns |
| Filtering | By status (paid/pending/overdue) and date range |
| PDF | Client-side generation using a lightweight library |
| Detail view | Separate route with full breakdown |
| Company info | Pulled from `companyConfig` singleton |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/invoices.tsx` | Invoice list page with DataTable (loader) |
| `pages/dashboard/invoice-detail.tsx` | Single invoice detail view + PDF download (loader + action) |
| `pages/dashboard/components/InvoiceRow.tsx` | Table row component for invoice list |
| `pages/dashboard/components/InvoiceDetail.tsx` | Full invoice display with line items |
| `core/pdf/invoice-pdf.ts` | PDF generation utility |
| `core/pdf/index.ts` | Barrel exports |

## New UI Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **DataTable** | `components/ui/data-table/` | Sortable table with column definitions |
| **Pagination** | `components/ui/pagination/` | Page navigation for invoice list |

## Routes

```typescript
{ path: "invoices", file: "pages/dashboard/invoices.tsx" },
{ path: "invoices/:id", file: "pages/dashboard/invoice-detail.tsx" },
```

## Loaders

### `/dashboard/invoices` Loader
```
1. Load all invoices from localStorage
2. Parse URL search params for filters (status, dateFrom, dateTo)
3. Apply filters
4. Sort by date (default: newest first)
5. Paginate (page size: 10)
6. Return { invoices, totalCount, currentPage, filters }
```

### `/dashboard/invoices/:id` Loader
```
1. Load single invoice by ID from localStorage
2. If not found → throw 404
3. Load related appointment data (for service details)
4. Load company config for invoice header
5. Return { invoice, appointment, companyInfo }
```

## Actions

### `/dashboard/invoices/:id` Action
```
intent: "download_pdf"
1. Load invoice data
2. Generate PDF using core/pdf/invoice-pdf.ts
3. Trigger browser download
4. Return success
```

## DataTable Columns

| Column | Sortable | Content |
|--------|----------|---------|
| Invoice # | Yes | `INV-001` format |
| Date | Yes (default) | Formatted date |
| Service | No | Service type name |
| Amount | Yes | Formatted currency |
| Status | Yes | Badge: Paid (emerald), Pending (amber), Overdue (red) |
| Actions | No | "View" link + "Download" button |

## Invoice Detail Layout

```
┌─────────────────────────────────────────┐
│ MELLOCLEAN                              │
│ 123 A Street, TX 77001                  │
│ (555) 123-4567 · company@email.com      │
├─────────────────────────────────────────┤
│ Invoice #INV-001        [Badge: Paid]   │
│ Date: March 15, 2025                    │
│ Property: 123 Main St (Home)            │
├─────────────────────────────────────────┤
│ Description          Qty  Price   Total │
│ ─────────────────────────────────────── │
│ Deep Cleaning         1   $120   $120   │
│ Inside Oven           1   $25    $25    │
│ Window Cleaning       1   $30    $30    │
│ ─────────────────────────────────────── │
│ Overtime (0.5 hrs)    1   $22.50 $22.50 │
│ ─────────────────────────────────────── │
│                       Subtotal: $197.50 │
│                       Tax:      $0.00   │
│                       Total:    $197.50 │
├─────────────────────────────────────────┤
│ Payment: Visa ending 4242               │
│ Paid on: March 16, 2025                 │
├─────────────────────────────────────────┤
│ [Download PDF]  [Back to Invoices]      │
└─────────────────────────────────────────┘
```

## PDF Generation

```typescript
// core/pdf/invoice-pdf.ts
// Uses jspdf or @react-pdf/renderer
// Input: Invoice + CompanyConfig
// Output: PDF blob → trigger download

function generateInvoicePdf(invoice: Invoice, company: CompanyConfig): Blob {
  // Company header (name, address, phone, email)
  // Invoice metadata (number, date, property)
  // Line items table
  // Totals section
  // Payment info
  // Footer
}
```

## Data Shape

```typescript
interface Invoice {
  id: string;
  number: string;              // "INV-001" format
  appointmentId: string;
  propertyId: string;
  date: string;
  serviceType: string;
  amount: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue";
  paidDate?: string;
  paymentMethodLast4?: string;
  items: InvoiceLineItem[];
}

interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
```

## Reuses

- **Button** (`components/ui/button/`) — download, back navigation
- **Badge** (new) — status indicators
- **Heading** (`components/ui/heading/`) — invoice title
- **Text** (`components/ui/text/`) — descriptions
- **Card** (new) — invoice detail container
- **DataTable** (new) — invoice list
- **Pagination** (new) — list pagination
- **companyConfig** (`core/config/config.ts`) — company info on invoices
- **Toast** (`components/ui/toast/`) — download success/error

## TSDoc Comments

- Invoice and InvoiceLineItem interfaces
- generateInvoicePdf function
- Invoice list loader (filter/sort/paginate logic)
- Invoice detail loader
- Download PDF action
