import DesktopView from '@/components/screens/DesktopView';
import MobileView from '@/components/screens/MobileView';
import { headers } from 'next/headers'

export default async function Home() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')

  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent || '');

  // 3. เลือกหยิบ "แปลนบ้าน" ให้ตรงกับอุปกรณ์
  if (isMobile) {
    return <MobileView />; // ส่งหน้าตาของมือถือไปให้
  }

  return <DesktopView />; // ส่งหน้าตาของคอมพิวเตอร์ไปให้
}
