/**
 * member-ledger.js
 * Mock Database for Existing KB Card Members (Validation & Auto-detection)
 */

(function (global) {
    // ────────────────────────────────────────────────────────────────
    // Mock Data: Existing Members
    // ────────────────────────────────────────────────────────────────
    const MEMBER_DB = {
        // Test Case: Existing Corporate Member (Additional Issuance)
        "1118111111": {
            type: "CORP",      // CORP | INDIV
            name: "(주)KB테스트",
            status: "EXISTING", // EXISTING (Add) | NEW
            dept: ["영업부", "관리부", "IT개발팀"] // For dept selection logic
        },

        // Test Case: Existing Individual Business (Additional Issuance)
        // 4th digit '1' -> Indiv
        "1111111111": {
            type: "INDIV",
            name: "박개인(개인사업자)",
            status: "EXISTING"
        },

        // Test Case: Existing Individual Business (Additional Issuance) - Alternate
        "2221122222": {
            type: "INDIV",
            name: "김국민(국민식당)",
            status: "EXISTING"
        }
    };

    /**
     * Check Logic
     * @param {string} bizNo - 10 digit string (or with dashes)
     * @returns {object} result - { status: 'NEW'|'EXISTING', type: 'CORP'|'INDIV', ... }
     */
    function checkMember(bizNo) {
        const cleanNo = (bizNo || "").replace(/[^0-9]/g, "");

        // 1. Check DB (Existing)
        if (MEMBER_DB[cleanNo]) {
            return {
                ...MEMBER_DB[cleanNo],
                found: true
            };
        }

        // 2. Logic for "New" (Not in DB)
        // Rule: 4th digit determines Type
        // XXX-YY-ZZZZZ -> 'Y' is the 4th digit in raw string (0-based index 3)
        // Mock Rule: If 4th digit is '8', assume CORP. Else INDIV.
        // (Real world: 81-87 is usually Corp, but simplified for mock)

        let estimatedType = "INDIV"; // Default
        if (cleanNo.length >= 4) {
            const fourthDigit = cleanNo.charAt(3); // 0-based index 3 is 4th char
            if (fourthDigit === "8") {
                estimatedType = "CORP";
            }
        }

        return {
            status: "NEW", // Not in DB -> New
            type: estimatedType,
            name: null,
            found: false
        };
    }

    // Export
    global.MemberLedger = {
        data: MEMBER_DB,
        check: checkMember
    };

})(window);
