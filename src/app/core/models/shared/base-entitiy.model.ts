export class BaseEntity {
    createdUserId: number | null | undefined;
    lastUpdatedUserId: number | null | undefined;
    status: DataStatus | undefined;
    createdIP: string | undefined;
    updatedIP: string | undefined;
    createdPcName: string | undefined;
    updatedPcName: string | undefined;
    createdAt: Date | string | undefined;
    lastUpdatedAt: Date | string | null | undefined;
    guid: string | undefined;
}

export enum DataStatus {
    Active,
    Passive,
    Cancel
}

export const DataStatusDataSource = [
    { id: 'Passive', name: 'Pasif', class: 'badge-soft-warning', icon: 'fa fa-ban' },
    { id: 'Active', name: 'Aktif', class: 'badge-soft-success', icon: 'fa fa-check-square' },
    { id: 'Cancel', name: 'Silinmiş', class: 'badge-soft-danger', icon: 'fa fa-trash' }
]


export const MonthlyDataSource = [
    { id: '1', name: 'Ocak' },
    { id: '2', name: 'Şubat' },
    { id: '3', name: 'Mart' },
    { id: '4', name: 'Nisan' },
    { id: '5', name: 'Mayıs' },
    { id: '6', name: 'Haziran' },
    { id: '7', name: 'Temmuz' },
    { id: '8', name: 'Ağustos' },
    { id: '9', name: 'Eylül' },
    { id: '10', name: 'Ekim' },
    { id: '11', name: 'Kasım' },
    { id: '12', name: 'Aralık' }
]

