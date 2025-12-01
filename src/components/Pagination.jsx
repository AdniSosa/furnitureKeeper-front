import styles from '../styles/Pagination.module.css'

const Pagination = ({totalPages = 5, currentPage = 1, onPageChange}) => {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    const firstPage = currentPage === 1;
    const lastPage = currentPage === totalPages;

    const stylePrevButton = firstPage ? {pointerEvents: 'none', opacity:0.5} : {};
    const styleNextButton = lastPage ? {pointerEvents: 'none', opacity: 0.5} : {};

    const handlePrevClick = (e) => {
        e.preventDefault();

        if(!firstPage) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNextClick = (e) => {
        e.preventDefault();
         
        if(!lastPage) {
            onPageChange(currentPage + 1)
        }
    }

    const handleChangePage = (e, page) => {
        e.preventDefault();

        if(page !== currentPage) {
            onPageChange(page)
        }
    }
    return (
        <nav className={styles.pagination}>
            <a href="#" style={stylePrevButton} onClick={handlePrevClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" /></svg>
            </a>
            {pages.map(page => (
                <a key={page} href="#" onClick={(e) => handleChangePage(e, page)} className={`${currentPage === page ? styles.isActive : ''}`}>{page}</a>
            ))}
            <a href="#" style={styleNextButton} onClick={handleNextClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-6l4 5l-4 5h6l4 -5z" /></svg>
            </a>
        </nav>
    )
}

export default Pagination;