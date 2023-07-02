"use client"

const Page = async () => {
  const handleClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/books`, {
      method: "POST",
      body: JSON.stringify({
        book: {
          title: "ボクたちはみんな大人になれなかった",
          published_at: "2018-12",
          description:
            "それは人生でたった一人、ボクが自分より好きになったひとの名前だ。気が付けば親指は友達リクエストを送信していて、90年代の渋谷でふたりぼっち、世界の終わりへのカウントダウンを聴いた日々が甦る。彼女だけがボクのことを認めてくれた。本当に大好きだった。過去と現在をSNSがつなぐ、切なさ新時代の大人泣きラブ・ストーリー。あいみょん、相澤いくえによるエッセイ&漫画を収録。",
          page_count: 192,
          author: "燃え殻",
          image: "http://books.google.com/books/content?id=F4ahvgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return (
    <div className="bg-neutral">
      <div>hoge</div>
      <button type="button" onClick={handleClick} className="w-20">
        button!
      </button>
    </div>
  )
}

export default Page
