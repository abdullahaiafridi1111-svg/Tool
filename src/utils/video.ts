import { ClientProduct } from "../types";

export function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    if (url.includes("youtube.com/embed/")) {
      return url;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    }
    if (url.includes("youtube.com/shorts/")) {
      const id = url.split("youtube.com/shorts/")[1]?.split("?")[0];
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    }
    if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      const v = urlObj.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}?autoplay=0&rel=0`;
    }
  } catch (_) {}
  return null;
}

export function getBinancePayLink(product: ClientProduct | null, settings?: Record<string, string>): string {
  if (!product) return "https://app.binance.com";

  if (product.binancePayUrl && product.binancePayUrl.trim().length > 0) {
    return product.binancePayUrl;
  }

  const name = (product.name || "").toLowerCase();

  if (name.includes("regular") || product.price === 49) {
    return settings?.binance_pay_regular || "https://app.binance.com/uni-qr/request-to-pay?billOrderId=454519522728255488&billType=request_a_payment";
  }
  if ((name.includes("exclusive") && !name.includes("ultra")) || product.price === 99) {
    return settings?.binance_pay_exclusive || "https://app.binance.com/uni-qr/request-to-pay?billOrderId=454520053332451328&billType=request_a_payment";
  }
  if (name.includes("ultra") || product.price === 199) {
    return settings?.binance_pay_ultra || "https://app.binance.com/uni-qr/request-to-pay?billOrderId=454520345259950080&billType=request_a_payment";
  }
  if (name.includes("enterprise") || product.price === 499) {
    return settings?.binance_pay_enterprise || "https://app.binance.com/uni-qr/request-to-pay?billOrderId=454525290869334016&billType=request_a_payment";
  }
  if (name.includes("supreme") || product.price === 1499) {
    return settings?.binance_pay_supreme || "https://app.binance.com/uni-qr/request-to-pay?billOrderId=455800498762473472&billType=request_a_payment";
  }
  if (name.includes("ultimate") || product.price === 1999) {
    return settings?.binance_pay_ultimate || "https://app.binance.com/uni-qr/request-to-pay?billOrderId=454525484264251392&billType=request_a_payment";
  }
  if (name.includes("apex") || product.price === 2999) {
    return settings?.binance_pay_apex || "https://app.binance.com/uni-qr/request-to-pay?billOrderId=455031287414710272&billType=request_a_payment";
  }

  return "https://app.binance.com";
}

export function getBinanceAppDeepLink(url: string): string {
  try {
    if (url.includes("billOrderId=")) {
      const match = url.match(/billOrderId=([0-9]+)/);
      if (match && match[1]) {
        return `bnc://app.binance.com/payment/secpay?orderId=${match[1]}`;
      }
    }
  } catch (_) {}
  return url;
}

export function getBinanceAndroidIntent(url: string): string {
  return url;
}

export function getBinancePayCode(url: string): string {
  try {
    const match = url.match(/billOrderId=([0-9]+)/);
    if (match && match[1]) return match[1];
  } catch (_) {}
  return "454519522728255488";
}
