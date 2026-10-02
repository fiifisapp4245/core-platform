"use client"

import * as React from "react"
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Phone,
  Plus,
  Smartphone,
  X,
} from "lucide-react"
import { toast } from "sonner"

import { paymentMethods, type MomoProvider } from "@/lib/mock"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const momoProviders: { id: MomoProvider; logo: string; color: string }[] = [
  { id: "MTN MoMo", logo: "MTN", color: "bg-yellow-400 text-yellow-900" },
  { id: "Telecel Cash", logo: "TC", color: "bg-red-500 text-white" },
  { id: "AT Money", logo: "AT", color: "bg-blue-600 text-white" },
]

// ─── Add method modal ─────────────────────────────────────────────────────────

type AddStep =
  | { type: "pick" }
  | { type: "momo-form"; provider?: MomoProvider; phone: string }
  | { type: "momo-waiting" }
  | { type: "card-form" }

function AddMethodModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = React.useState<AddStep>({ type: "pick" })
  const [selectedMethod, setSelectedMethod] = React.useState<"momo" | "card" | null>(null)
  const [provider, setProvider] = React.useState<MomoProvider | undefined>()
  const [phone, setPhone] = React.useState("+233 ")
  const [cardNum, setCardNum] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvv, setCvv] = React.useState("")

  function startMomo() {
    setStep({ type: "momo-form", provider, phone })
  }

  async function submitMomo() {
    if (!provider || !phone) return
    setStep({ type: "momo-waiting" })
    // Simulate waiting for approval (mock: auto-succeed after 2s)
    await new Promise((r) => setTimeout(r, 2000))
    toast.success(`${provider} account saved`)
    onClose()
  }

  if (step.type === "pick") {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Add payment method</h2>
        <p className="text-sm text-muted-foreground">
          Choose how you want to pay for your TroveSuite subscription.
        </p>

        {/* Mobile Money option */}
        <div className="flex flex-col rounded-xl border overflow-hidden">
          <button
            type="button"
            onClick={() =>
              setSelectedMethod((m) => (m === "momo" ? null : "momo"))
            }
            className="flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-yellow-400/20 text-yellow-700 dark:text-yellow-400">
              <Smartphone className="size-4" />
            </span>
            <div className="flex-1">
              <div className="font-medium">Mobile Money</div>
              <div className="text-xs text-muted-foreground">
                MTN MoMo, Telecel Cash, AT Money
              </div>
            </div>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${selectedMethod === "momo" ? "rotate-180" : ""}`}
            />
          </button>

          {selectedMethod === "momo" && (
            <div className="border-t bg-muted/30 p-4 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                {momoProviders.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProvider(p.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors ${
                      provider === p.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "hover:bg-muted/60"
                    }`}
                  >
                    <span
                      className={`flex size-8 items-center justify-center rounded-md text-xs font-bold ${p.color}`}
                    >
                      {p.logo}
                    </span>
                    {p.id}
                  </button>
                ))}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+233 XX XXX XXXX"
                    className="pl-8"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter the number registered with your MoMo account.
                </p>
              </div>
              <Button onClick={startMomo} disabled={!provider || phone.length < 10}>
                Continue
              </Button>
            </div>
          )}
        </div>

        {/* Card option */}
        <div className="flex flex-col rounded-xl border overflow-hidden">
          <button
            type="button"
            onClick={() =>
              setSelectedMethod((m) => (m === "card" ? null : "card"))
            }
            className="flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CreditCard className="size-4" />
            </span>
            <div className="flex-1">
              <div className="font-medium">Debit or credit card</div>
              <div className="text-xs text-muted-foreground">
                Visa, Mastercard, other
              </div>
            </div>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${selectedMethod === "card" ? "rotate-180" : ""}`}
            />
          </button>

          {selectedMethod === "card" && (
            <div className="border-t bg-muted/30 p-4 flex flex-col gap-3">
              <div className="rounded-lg border bg-card p-3 text-center text-sm text-muted-foreground">
                {/* In production: replace with payment provider hosted fields */}
                Card form (hosted payment fields would render here)
              </div>
              <Input
                placeholder="Card number"
                value={cardNum}
                onChange={(e) => setCardNum(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="MM / YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                <Input
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Card details are processed securely. We never store raw card data.
              </p>
              <Button
                onClick={() => {
                  toast.success("Card saved")
                  onClose()
                }}
              >
                Save card
              </Button>
            </div>
          )}
        </div>

        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    )
  }

  if (step.type === "momo-waiting") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="flex size-16 animate-pulse items-center justify-center rounded-full bg-yellow-400/20">
          <Smartphone className="size-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <p className="font-semibold">Approve on your phone</p>
          <p className="mt-1 text-sm text-muted-foreground">
            A payment prompt has been sent to {phone}. Open your{" "}
            {provider} app and approve it.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setStep({ type: "pick" })}>
          Cancel
        </Button>
      </div>
    )
  }

  return null
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PaymentMethodsPage() {
  const [showAdd, setShowAdd] = React.useState(false)
  const methods = paymentMethods

  const hasFailed = methods.some((m) => m.status === "failed")

  return (
    <div className="flex flex-col gap-4">
      {hasFailed && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-medium text-destructive">Payment failed</p>
            <p className="text-muted-foreground">
              Your default payment method was declined. Please update it to
              avoid service interruption.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {methods.length} payment method{methods.length !== 1 && "s"}
        </p>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus data-icon="inline-start" /> Add method
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {methods.map((pm) => (
          <Card key={pm.id} className="flex items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              {pm.type === "card" ? (
                <CreditCard className="size-5 text-muted-foreground" />
              ) : (
                <Smartphone className="size-5 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              {pm.type === "card" ? (
                <>
                  <div className="flex items-center gap-2 font-medium">
                    {pm.brand} ···{pm.last4}
                    {pm.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Expires {pm.expiry}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 font-medium">
                    {pm.provider}
                    {pm.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{pm.phone}</p>
                </>
              )}
            </div>
            {pm.status === "active" ? (
              <CheckCircle2 className="size-4 shrink-0 text-success" />
            ) : (
              <AlertTriangle className="size-4 shrink-0 text-destructive" />
            )}
            <div className="flex gap-1">
              {!pm.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    toast.success(`${pm.type === "card" ? `${pm.brand} ···${pm.last4}` : pm.provider} set as default`)
                  }
                >
                  Set default
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Remove payment method"
                onClick={() => {
                  if (pm.isDefault) {
                    toast.error("Cannot remove the default payment method.")
                  } else {
                    toast.success("Payment method removed")
                  }
                }}
              >
                <X />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add method overlay */}
      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowAdd(false)}
        >
          <Card
            className="w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <AddMethodModal onClose={() => setShowAdd(false)} />
          </Card>
        </div>
      )}
    </div>
  )
}
