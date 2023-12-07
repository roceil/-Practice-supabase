import { describe, it, expect, vi } from 'vitest'
import generateImagePath from '@/composable/user/generateImagePath'

// 模擬 supabase
vi.mock('@/supabase', () => {
  return {
    default: {
      storage: {
        from: () => ({
          createSignedUrl: (name, expiry) =>
            Promise.resolve({ data: { signedUrl: `https://example.com/${name}?expiry=${expiry}` } })
        })
      }
    }
  }
})

describe('generateImagePath', () => {
  it('應該返回簽署的圖片路徑', async () => {
    const name = 'test-image.png'
    const url = await generateImagePath(name)

    expect(url).toBe(`https://example.com/${name}?expiry=31536000000`)
  })
})

// 一開始先把整個 supabase 模組 mock 掉，接著在測試案例中，模擬 supabase.storage.from().createSignedUrl() 的回傳值，最後驗證 generateImagePath() 是否正確回傳簽署的圖片路徑。

// 之所以不是 mock generateImagePath()，是因為 generateImagePath() 本身就是一個 async function，如果要 mock 它，就要寫成這樣：
// vi.mock('@/composable/user/generateImagePath', () => {
//   return {
//     default: async (name) => {
//       return `https://example.com/${name}?expiry=31536000000`
//     }
//   }
// });

// 可是這樣寫的話，還是會依賴到 supabase，所以當我們把整個 supabase mock掉的時候，generateImagePath 被呼叫時，其實是呼叫我們自己 mock 的 supabase，而不是真正的 supabase，這樣就可以避免真的去呼叫 supabase 的 API 了。

// vi.mock return 的物件中，第一個 key default 是因為 supabse 是使用預設匯出，而下一個 key storage 是因為 supabase.storage 是使用命名匯出，所以要用 storage 來指定，再下一個 key from 是因為 supabase.storage.from() 是使用命名匯出，所以要用 from 來指定，最後一個 key createSignedUrl 是因為 supabase.storage.from().createSignedUrl() 是使用命名匯出，所以要用 createSignedUrl 來指定。
