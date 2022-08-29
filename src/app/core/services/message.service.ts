import notify from 'devextreme/ui/notify';
import { environment } from 'src/environments/environment';

export const messageService = {
    onCatch: (error: any) => {
        try {
            const objErr = error.error;
            environment.isLoading = false;
            environment.isRequesting = false;
            if (objErr) {
                if (objErr.error) {
                    switch (error.status) {                        
                        case 400:
                            notify(objErr.error.message ? objErr.error.message :
                                'İstek hatalı. Sorunun devam etmesi durumunda sistem yöneticisi ile iletişime geçiniz.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 401:
                            localStorage.removeItem(environment.token);
                            // window.location.href = window.location.origin + environment.loginPath;
                            break;
                        case 402:
                            notify(objErr.error.message ? objErr.error.message : 'Ödeme gerekli.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 403:
                            notify(objErr.error.message ? objErr.error.message : 'Ulaşmaya çalıştığınız kaynak yasaklanmıştır.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 404:
                            notify(objErr.error.message ? objErr.error.message : 'İşlem kaynağı bulunamadı.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 405:
                            notify(objErr.error.message ? objErr.error.message :
                                'İstek kabul edilemez lütfen sistem yöneticiniz ile iletişime geçiniz.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 406:
                            notify(objErr.error.message ? objErr.error.message : 'İstemcinin Accept header\'ında verilen özellik karşılanamıyor.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 407:
                            notify(objErr.error.message ? objErr.error.message : 'Proxy üzerinden yetkilendirme gerekiyor.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 408:
                            notify(objErr.error.message ? objErr.error.message : 'İstek zaman aşımına uğradı (belirli bir sürede istek tamamlanamadı).', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 409:
                            notify(objErr.error.message ? objErr.error.message : 'İstek içinde çelişki var.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 410:
                            notify(objErr.error.message ? objErr.error.message : 'Kaynak artık yok.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 411:
                            notify(objErr.error.message ? objErr.error.message : 'İstekte "Content-Length" (içeriğin boyutu) belirtilmemiş.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 412:
                            notify(objErr.error.message ? objErr.error.message : 'Sunucu istekte belirtilen bazı önkoşulları karşılamıyor.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 413:
                            notify(objErr.error.message ? objErr.error.message : 'İsteğin boyutu çok büyük olduğu için işlenemedi.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 414:
                            notify(objErr.error.message ? objErr.error.message : 'URI (URL) fazla büyük.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 416:
                            notify(objErr.error.message ? objErr.error.message : 'İstenilen kaynak istenilen medya tipini desteklemiyor.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        case 417:
                            notify(objErr.error.message ? objErr.error.message :
                                'İstek yapılan parça (bir dosyanın bir parçası vb..) sunucu tarafından verilebiliyor veya uygun değil.', 'error', (objErr.error.time ? objErr.error.time : 7000));
                            break;
                        default:
                            break;
                    }
                }
            }
        } catch (error) { }
    },

    onSubscribeSuccess: (res: any) => {
        try {
            environment.isLoading = false;
            environment.isRequesting = false;
            if (res && res.success) {
                notify(res.success.message ? res.success.message : 'İşlem başarıyla gerçekleşti.', 'success', (res.success.time ? res.success.time : 1500));
            } else if (res && res.error) {
                notify(res.error.message ? res.error.message : 'Opss! Bir hata ile karşılaşıldı!', 'error', (res.error.time ? res.error.time : 1500));
            }
        } catch { }
    },

    errorHandler: (e: any) => {
        environment.isLoading = false;
        environment.isRequesting = false;
        switch (e.httpStatus) {
            case 400:
                notify((e.errorDetails ? e.errorDetails.message : 'Hata istek. Sorunun devam etmesi durumunda sistem yöneticisi ile iletişime geçiniz.'), 'error', 7000);
                break;
            case 401:
                localStorage.removeItem(environment.token);
                // window.location.href = window.location.origin + environment.loginPath;
                break;
            case 402:
                notify((e.errorDetails ? e.errorDetails.message : 'Ödeme gerekli.'), 'error', 7000);
                break;
            case 403:
                notify((e.errorDetails ? e.errorDetails.message : 'Ulaşmaya çalıştığınız kaynak yasaklanmıştır.'), 'error', 7000);
                break;
            case 404:
                notify((e.errorDetails ? e.errorDetails.message : 'İşlem kaynağı bulunamadı.'), 'error', 7000);
                break;
            case 405:
                notify((e.errorDetails ? e.errorDetails.message : 'İstek kabul edilemez lütfen sistem yöneticiniz ile iletişime geçiniz.'), 'error', 7000);
                break;
            case 406:
                notify((e.errorDetails ? e.errorDetails.message : 'İstemcinin Accept header\'ında verilen özellik karşılanamıyor.'), 'error', 7000);
                break;
            case 407:
                notify((e.errorDetails ? e.errorDetails.message : 'Proxy üzerinden yetkilendirme gerekiyor.'), 'error', 7000);
                break;
            case 408:
                notify((e.errorDetails ? e.errorDetails.message : 'İstek zaman aşımına uğradı (belirli bir sürede istek tamamlanamadı).'), 'error', 7000);
                break;
            case 409:
                notify((e.errorDetails ? e.errorDetails.message : 'İstek içinde çelişki var.'), 'error', 7000);
                break;
            case 410:
                notify((e.errorDetails ? e.errorDetails.message : 'Kaynak artık yok.'), 'error', 7000);
                break;
            case 411:
                notify((e.errorDetails ? e.errorDetails.message : 'İstekte "Content-Length" (içeriğin boyutu) belirtilmemiş.'), 'error', 7000);
                break;
            case 412:
                notify((e.errorDetails ? e.errorDetails.message : 'Sunucu istekte belirtilen bazı önkoşulları karşılamıyor.'), 'error', 7000);
                break;
            case 413:
                notify((e.errorDetails ? e.errorDetails.message : 'İsteğin boyutu çok büyük olduğu için işlenemedi.'), 'error', 7000);
                break;
            case 414:
                notify((e.errorDetails ? e.errorDetails.message : 'URI (URL) fazla büyük.'), 'error', 7000);
                break;
            case 416:
                notify((e.errorDetails ? e.errorDetails.message : 'İstenilen kaynak istenilen medya tipini desteklemiyor.'), 'error', 7000);
                break;
            case 417:
                notify((e.errorDetails ? e.errorDetails.message : 'İstek yapılan parça (bir dosyanın bir parçası vb..) sunucu tarafından verilebiliyor veya uygun değil.'), 'error', 7000);
                break;
            case 500:
                notify((e.errorDetails ? e.errorDetails.message : 'Opss! Bir hata ile karşılaşıldı!'), 'error', (e.errorDetails && e.errorDetails.time ? e.errorDetails.time : 1500));
                break;
            default:
                break;
        }
    },

    onInserted(e: any = null) {
        debugger;
        environment.isLoading = false;
        environment.isRequesting = false;
        notify(e != null? (e?.message ? e?.message: e) : 'Kayıt başarıyla oluşturuldu.', 'success', 3000)
        // notify('Kayıt başarıyla oluşturuldu.', 'success', 1500);
    },

    onRemoved(e: any = null) {
        debugger;
        environment.isLoading = false;
        environment.isRequesting = false;
        notify(e != null? (e?.message ? e?.message: e) :'Kayıt başarıyla silindi.', 'success', 1500);
        // notify('Kayıt başarıyla silindi.', 'success', 1500);
    },

    onUpdated(e: any = null) {
        environment.isLoading = false;
        environment.isRequesting = false;
        notify(e != null? (e?.message ? e?.message: e) : 'Kayıt başarıyla güncelleştirildi.', 'success', 1500)
        // notify('Kayıt başarıyla güncelleştirildi.', 'success', 1500);
    }
}
