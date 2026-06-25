const PER_PAGE = 15;

let allItems = [];
let currentPage = 1;

fetch("data/data.json")
    .then((res) => res.json())
    .then((items) => {
        allItems = items.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderPage(1);
    });

function renderPage(page) {
    currentPage = page;

    const newsList = document.getElementById("news-list");
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    const pageItems = allItems.slice(start, end);

    newsList.innerHTML = pageItems
        .map((item) => {
            const date = new Date(item.date);
            const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

            return `
                <div class="news-item">
                    <div>
                        ${formattedDate} -
                        <a href="article.html#${item.slug}">
                            ${item.title}
                        </a>
                    </div>
                    <p class="news-desc">
                        ${item.desc}
                    </p>
                    
                </div>
            `;
        })
        .join("<hr>");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(allItems.length / PER_PAGE);
    const pagination = document.getElementById("pagination");

    if (totalPages <= 1) {
        pagination.innerHTML = "";
        return;
    }

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button
                onclick="renderPage(${i})"
                ${i === currentPage ? "disabled" : ""}
            >
                ${i}
            </button>
        `;
    }
}
