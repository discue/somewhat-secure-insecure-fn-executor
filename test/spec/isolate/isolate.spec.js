'use strict'

const { expect } = require('chai')
const { callFunctionWithArguments, createNewIsolatedContext, runWithIsolatedContext, createTransferableReference, copyValueFromReference } = require('../../../lib/isolate/isolate.js')

describe('Isolate', () => {
    describe('.creatednewIsolatedContext', () => {
        it('returns isolate and context', async () => {
            const { context, isolate } = await createNewIsolatedContext()
            expect(isolate).not.to.be.null
            expect(isolate).not.to.be.undefined
            expect(context).not.to.be.null
            expect(context).not.to.be.undefined
            isolate.dispose()
        })
        it('does not leak global vars', async () => {
            const { context, isolate } = await createNewIsolatedContext()
            const fn = `
                   const vars = ["0", "1", "2", "3", "4", "window", "self", "document", "name", "location", "customElements", "history", "navigation", "locationbar", "menubar", "personalbar", "scrollbars", "statusbar", "toolbar", "status", "closed", "frames", "length", "top", "opener", "parent", "frameElement", "navigator", "origin", "external", "screen", "innerWidth", "innerHeight", "scrollX", "pageXOffset", "scrollY", "pageYOffset", "visualViewport", "screenX", "screenY", "outerWidth", "outerHeight", "devicePixelRatio", "clientInformation", "screenLeft", "screenTop", "styleMedia", "onsearch", "isSecureContext", "trustedTypes", "performance", "onappinstalled", "onbeforeinstallprompt", "crypto", "indexedDB", "sessionStorage", "localStorage", "onbeforexrselect", "onabort", "onbeforeinput", "onbeforetoggle", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextlost", "oncontextmenu", "oncontextrestored", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onslotchange", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting", "onwebkitanimationend", "onwebkitanimationiteration", "onwebkitanimationstart", "onwebkittransitionend", "onwheel", "onauxclick", "ongotpointercapture", "onlostpointercapture", "onpointerdown", "onpointermove", "onpointerrawupdate", "onpointerup", "onpointercancel", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "onselectstart", "onselectionchange", "onanimationend", "onanimationiteration", "onanimationstart", "ontransitionrun", "ontransitionstart", "ontransitionend", "ontransitioncancel", "onafterprint", "onbeforeprint", "onbeforeunload", "onhashchange", "onlanguagechange", "onmessage", "onmessageerror", "onoffline", "ononline", "onpagehide", "onpageshow", "onpopstate", "onrejectionhandled", "onstorage", "onunhandledrejection", "onunload", "crossOriginIsolated", "scheduler", "alert", "blur", "cancelAnimationFrame", "cancelIdleCallback", "captureEvents", "clearInterval", "clearTimeout", "close", "confirm", "createImageBitmap", "fetch", "find", "focus", "getComputedStyle", "getSelection", "matchMedia", "moveBy", "moveTo", "open", "postMessage", "print", "prompt", "queueMicrotask", "releaseEvents", "reportError", "requestAnimationFrame", "requestIdleCallback", "resizeBy", "resizeTo", "scroll", "scrollBy", "scrollTo", "setInterval", "setTimeout", "stop", "structuredClone", "webkitCancelAnimationFrame", "webkitRequestAnimationFrame", "chrome", "fence", "caches", "cookieStore", "ondevicemotion", "ondeviceorientation", "ondeviceorientationabsolute", "launchQueue", "sharedStorage", "documentPictureInPicture", "onbeforematch", "getScreenDetails", "queryLocalFonts", "showDirectoryPicker", "showOpenFilePicker", "showSaveFilePicker", "originAgentCluster", "credentialless", "speechSynthesis", "oncontentvisibilityautostatechange", "onscrollend", "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "$", "jQuery"]
                   const existingVars = vars.filter((v) => global[v])
                   return existingVars.length
                `
            const existingVarsLength = await callFunctionWithArguments(context, fn)
            expect(existingVarsLength).to.equal(0)
            isolate.dispose()
        })
        it('knows about js data object types', async () => {
            const { context, isolate } = await createNewIsolatedContext()
            const fn = `
                   const vars = ["Object", "Boolean", "Number", "BigInt", "String", "Symbol"]
                   const existingVars = vars.filter((v) => global[v])
                   return existingVars.length
                `
            const existingVarsLength = await callFunctionWithArguments(context, fn)
            expect(existingVarsLength).to.equal(6)
            isolate.dispose()
        })
        it('knows about js object types', async () => {
            const { context, isolate } = await createNewIsolatedContext()
            const fn = `
                   const vars = ["Date", "Math", "RegExp", "Array", "Function", "Error"]
                   const existingVars = vars.filter((v) => global[v])
                   return existingVars.length
                `
            const existingVarsLength = await callFunctionWithArguments(context, fn)
            expect(existingVarsLength).to.equal(6)
            isolate.dispose()
        })
    })
    describe('.runWithIsolatedContext', () => {
        it('calls callback with context and isolated', async () => {
            let callbackCalled = false
            await runWithIsolatedContext({}, ({ isolate, context }) => {
                expect(isolate).not.to.be.null
                expect(isolate).not.to.be.undefined
                expect(context).not.to.be.null
                expect(context).not.to.be.undefined
                callbackCalled = true
            })
            expect(callbackCalled).to.equal(true)
        })
    })
    describe('.createTransferableReference', () => {
        it('creates a new reference', () => {
            const ref = createTransferableReference('abc')
            expect(typeof ref.copySync).to.equal('function')
        })
    })
    describe('.copyValueFromReference', () => {
        it('returns value from a reference', async () => {
            const ref = createTransferableReference({ name: 'Peter' })
            const value = await copyValueFromReference(ref, 'name')
            expect(value).to.equal('Peter')
        })
        it('extracts nested ref', async () => {
            const name = createTransferableReference('Peter')
            const ref = createTransferableReference({ name })
            const value = await copyValueFromReference(ref, 'name')
            expect(value).to.equal('Peter')
        })
        it('returns a default value if key does not exist', async () => {
            const ref = createTransferableReference({ name: 'Peter' })
            const value = await copyValueFromReference(ref, 'age', 22)
            expect(value).to.equal(22)
        })
    })
    describe('callFunctionWithArguments', () => {
        it('calls function with given args', async () => {
            await runWithIsolatedContext({}, async ({ context }) => {
                const string = `return $0 + $1`
                const result = await callFunctionWithArguments(context, string, 1, 2)
                expect(result).to.equal(3)
            })
        })
        it('handles string arguments', async () => {
            await runWithIsolatedContext({}, async ({ context }) => {
                const string = `return $0 + $1`
                const result = await callFunctionWithArguments(context, string, '1', '2')
                expect(result).to.equal('12')
            })
        })
        it('handles refs', async () => {
            await runWithIsolatedContext({}, async ({ context }) => {
                const ref = createTransferableReference({ name: 'Peter' })
                const string = `return $0.copySync()['name']`
                const result = await callFunctionWithArguments(context, string, ref)
                expect(result).to.equal('Peter')
            })
        })
        it('does not handle object arguments', async () => {
            await runWithIsolatedContext({}, async ({ context }) => {
                const string = `return $0.name`
                try {
                    await callFunctionWithArguments(context, string, { name: 'Peter' })
                    throw new Error('Must throw')
                } catch (e) {
                    expect(e.message).to.include('non-transferable')
                }
            })
        })
    })
})