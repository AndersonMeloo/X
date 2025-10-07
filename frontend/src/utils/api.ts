const API_URL = 'http://localhost:3000';

export async function apiFetch(

    path: string,
    options: RequestInit = {}
) {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const headers = {

        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    })

    const data = await res.json().catch(() => ({}))

    // if (!res.ok || data.error) throw new Error(data.error || 'Erro na Requisição')
    if (!res.ok || data.error) {

        const errorMessage =
            typeof data.error === 'string'
                ? data.error
                : JSON.stringify(data.error)
        throw new Error(errorMessage || 'Erro na Requisição')
    }

    return data
}