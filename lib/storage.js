const STORAGE_KEYS = {
  REQUESTS: "tf_requests_v2",
  MESSAGES: "tf_messages_v2",
  WORKFLOW_STATE: "tf_workflow_v2",
  SERIAL: "tf_serial_v2",
};

/**
 * Generate a dynamic demo Request ID in format: TF-2026-00001
 */
export function generateRequestId() {
  if (typeof window === "undefined") {
    return `TF-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  }
  
  try {
    const currentYear = new Date().getFullYear();
    const storedSerial = localStorage.getItem(STORAGE_KEYS.SERIAL);
    let serial = storedSerial ? parseInt(storedSerial, 10) : 101;
    serial += 1;
    localStorage.setItem(STORAGE_KEYS.SERIAL, serial.toString());
    const padded = String(serial).padStart(5, "0");
    return `TF-${currentYear}-${padded}`;
  } catch {
    return `TF-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  }
}

/**
 * Save an enquiry or greeting request
 */
export function saveDemoRequest(request) {
  if (typeof window === "undefined") return request;
  try {
    const list = getDemoRequests();
    const newRequest = {
      ...request,
      createdAt: new Date().toISOString(),
      status: "Submitted (Under Review)",
    };
    list.unshift(newRequest);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
    return newRequest;
  } catch (e) {
    console.error("Failed to save request to localStorage:", e);
    return request;
  }
}

/**
 * Get all stored demo requests
 */
export function getDemoRequests() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to read requests from localStorage:", e);
    return [];
  }
}

/**
 * Look up a demo request by ID
 */
export function findRequestById(id) {
  if (!id) return null;
  const list = getDemoRequests();
  const cleanId = id.trim().toUpperCase();
  return list.find((item) => item.id && item.id.toUpperCase() === cleanId) || null;
}

/**
 * Save conversation history & workflow state
 */
export function saveChatSession(messages, workflowState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    localStorage.setItem(STORAGE_KEYS.WORKFLOW_STATE, JSON.stringify(workflowState));
  } catch (e) {
    console.error("Failed to save chat session:", e);
  }
}

/**
 * Load conversation history & workflow state
 */
export function loadChatSession() {
  if (typeof window === "undefined") return null;
  try {
    const msgs = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const wf = localStorage.getItem(STORAGE_KEYS.WORKFLOW_STATE);
    if (!msgs) return null;
    return {
      messages: JSON.parse(msgs),
      workflowState: wf ? JSON.parse(wf) : null,
    };
  } catch (e) {
    console.error("Failed to load chat session:", e);
    return null;
  }
}

/**
 * Clear chat session (Restart)
 */
export function clearChatSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.WORKFLOW_STATE);
  } catch (e) {
    console.error("Failed to clear chat session:", e);
  }
}
